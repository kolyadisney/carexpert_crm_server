import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenTypeEnum } from '../../infrastructure/enums/token-type.enum';
import { TokenTypeIncorrectException } from '../../infrastructure/exceptions';
import { JwtTokenPayloadInterface } from '../interfaces/jwt-token-payload.interface';

export const JwtAuthName = 'access_token';
export const JwtStrategyOptionalName = 'jwt';

@Injectable()
export class JwtStrategyOptional extends PassportStrategy(
  Strategy,
  JwtStrategyOptionalName,
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtTokenPayloadInterface) {
    if (payload.sub.type !== TokenTypeEnum.ACCESS) {
      throw new TokenTypeIncorrectException();
    }

    return payload;
  }
}
