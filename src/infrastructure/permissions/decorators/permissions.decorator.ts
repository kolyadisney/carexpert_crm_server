import { SetMetadata, applyDecorators } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const PermissionsDecorator = (roles: UserRole[] | UserRole) =>
  applyDecorators(SetMetadata('roles', roles));
