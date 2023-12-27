import {
  ApplicationException,
  ApplicationExceptionDataType,
} from '../application.exception';
import { HttpStatus } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { MessageErrCodeEnum } from '../enums/message-err-code.enum';

export const ROLE_DOES_NOT_ALLOWED_EXCEPTION_NAME = 'role_does_not_allowed';

export class RoleNotAllowedException extends ApplicationException {
  constructor(public role: UserRole) {
    super();
  }

  getStatus(): number {
    return HttpStatus.UNPROCESSABLE_ENTITY;
  }

  getCode(): string {
    return ROLE_DOES_NOT_ALLOWED_EXCEPTION_NAME;
  }

  getMessageErrCode(): MessageErrCodeEnum {
    return MessageErrCodeEnum.ROLE_DOES_NOT_ALLOWED;
  }

  getMessage(): string {
    return `Role ${this.role} does not allowed`;
  }

  getData(): ApplicationExceptionDataType {
    return {
      role: this.role,
    };
  }
}
