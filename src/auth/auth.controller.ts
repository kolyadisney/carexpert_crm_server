import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterRequestBody } from './request-bodies/register.request-body';
import { LoginResponseBody } from './response-bodies/login.response-body';
import { LoginRequestBody } from './request-bodies/login.request-body';
import { Response } from 'express';
import { RolePermissionsGuard } from '../infrastructure/permissions/guards/role-permissions.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsDecorator } from '../infrastructure/permissions/decorators/permissions.decorator';
import { UserRole } from '@prisma/client';
import { CheckJWTPayloadPipe } from '../infrastructure/pipes/check-jwt-payload.pipe';
import { JwtRefreshAuthName } from './strategies/jwt-refresh.strategy';
import { RefreshResponseBody } from './response-bodies/refresh.response-body';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { JwtTokenPayloadDecorator } from './decorators/jwt-token-payload.decorator';
import { JwtTokenPayloadInterface } from './interfaces/jwt-token-payload.interface';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Register new users',
  })
  @UseGuards(RolePermissionsGuard)
  @PermissionsDecorator(UserRole.OWNER)
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(
    @Body()
    registerRequestBody: RegisterRequestBody,
  ) {
    return this.authService.register(registerRequestBody);
  }

  @ApiOperation({
    description: 'Login for users',
  })
  @ApiOkResponse({ type: LoginResponseBody })
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginRequestBody: LoginRequestBody,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(loginRequestBody, response);
  }

  @ApiOperation({
    description: 'Refresh token',
  })
  @ApiBearerAuth(JwtRefreshAuthName)
  @ApiOkResponse({ type: RefreshResponseBody })
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refreshAccessToken(
    @JwtTokenPayloadDecorator() jwtTokenPayload: JwtTokenPayloadInterface,
  ) {
    return this.authService.refreshAccessToken(jwtTokenPayload);
  }
}
