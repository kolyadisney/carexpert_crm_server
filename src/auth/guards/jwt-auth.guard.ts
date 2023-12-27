import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategyName } from '../strategies/jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JwtStrategyName) {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request?.cookies.access_token) {
      request.headers.authorization = `Bearer ${request?.cookies.access_token}`;
    }
    return super.canActivate(context);
  }
}
