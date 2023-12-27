import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import validator from 'validator';
import { PrismaService } from '../prisma/prisma.service';
import {
  TokenGenerationException,
  UserAlreadyExistException,
} from '../infrastructure/exceptions';
import * as bcrypt from 'bcrypt';
import { RegisterRequestBody } from './request-bodies/register.request-body';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { IncorrectPasswordException } from '../infrastructure/exceptions';
import { TokenTypeEnum } from '../infrastructure/enums/token-type.enum';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtTokenPayloadInterface } from './interfaces/jwt-token-payload.interface';
import { LoginRequestBody } from './request-bodies/login.request-body';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  loginKey(login: string): string {
    if (validator.isEmail(login)) {
      return 'email';
    }
    return 'phone';
  }

  async validateUser(login: string, password: string): Promise<User | any> {
    const user: User = await this.userService.findOneUser(
      this.loginKey(login),
      login,
    );
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new IncorrectPasswordException();
    }

    const { password: pwd, ...result } = user;
    return result;
  }

  async generatePayload(
    user: User,
    tokenType: TokenTypeEnum = TokenTypeEnum.ACCESS,
  ) {
    const options: JwtSignOptions = {
      expiresIn: `${this.configService.get<string>(
        'JWT_TOKEN_TTL_IN_SECONDS',
      )}s`,
    };
    const payload: JwtTokenPayloadInterface = {
      email: user.email,
      sub: { user_id: user.id, user_role: user.role, type: tokenType },
    };

    if (tokenType === TokenTypeEnum.REFRESH) {
      options.expiresIn = `${this.configService.get<string>(
        'JWT_REFRESH_TOKEN_TTL_IN_SECONDS',
      )}s`;
    }

    if (tokenType === TokenTypeEnum.RESET_PASSWORD) {
      options.expiresIn = `${this.configService.get<string>(
        'JWT_RESET_PASSWORD_TOKEN_TTL_IN_SECONDS',
      )}s`;
    }

    const token = this.jwtService.sign(payload, options);

    if (!token) {
      throw new TokenGenerationException();
    }

    return token;
  }

  async refreshAccessToken(jwtTokenPayload: JwtTokenPayloadInterface) {
    const user: User = await this.userService.findOneUser(
      'email',
      jwtTokenPayload.email,
    );

    return {
      access_token: await this.generatePayload(user),
      refresh_token: await this.generatePayload(user, TokenTypeEnum.REFRESH),
    };
  }

  async register(registerRequestBody: RegisterRequestBody) {
    const existUser = await this.prismaService.user.findUnique({
      where: {
        email: registerRequestBody.email,
      },
    });
    if (existUser) {
      throw new UserAlreadyExistException('email', registerRequestBody.email);
    }

    const hashedPassword = await bcrypt.hash(
      registerRequestBody.password,
      Number(this.configService.get<number>('SALT_ROUNDS')),
    );

    const user = await this.prismaService.user.create({
      data: {
        ...registerRequestBody,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        first_name: true,
        last_name: true,
        role: true,
        created_at: true,
      },
    });

    return user;
  }

  async login(userData: LoginRequestBody, res: Response) {
    const user: User = await this.userService.findOneUser(
      this.loginKey(userData.login),
      userData.login,
    );

    const token = await this.generatePayload(user);
    const refreshToken = await this.generatePayload(
      user,
      TokenTypeEnum.REFRESH,
    );
    //TODO: Think about it
    res.cookie('access_token', token, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });

    return {
      ...user,
      access_token: token,
      refresh_token: refreshToken,
    };
  }
}
