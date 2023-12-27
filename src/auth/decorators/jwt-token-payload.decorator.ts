import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtTokenPayloadInterface } from '../interfaces/jwt-token-payload.interface';

export const JwtTokenPayloadDecorator = createParamDecorator(
  (data, ctx: ExecutionContext): JwtTokenPayloadInterface => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
