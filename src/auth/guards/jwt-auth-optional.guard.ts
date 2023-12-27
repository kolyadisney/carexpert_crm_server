import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategyOptionalName } from '../strategies/jwt.strategy-optional';
import { ConfigService } from '@nestjs/config';
import { isUndefined } from 'lodash';

@Injectable()
export class JwtAuthGuardOptional extends AuthGuard(JwtStrategyOptionalName) {
  constructor(private readonly configService: ConfigService) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (isUndefined(authHeader)) {
      request.headers.authorization = `Bearer ${this.configService.get<string>(
        'JWT_TOKEN_DEFAULT',
      )}`;
    }

    return super.canActivate(context);
  }
}
