import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { RoleNotAllowedException } from '../../exceptions';

@Injectable()
export class RolePermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles: [UserRole] = this.reflector.get<[UserRole]>(
      'roles',
      ctx.getHandler(),
    );

    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (user.sub.user_role === UserRole.OWNER) {
      return true;
    }

    if (!roles) {
      return true;
    }

    if (!roles.includes(user.sub.user_role)) {
      throw new RoleNotAllowedException(user.sub.user_role);
    }

    return true;
  }
}
