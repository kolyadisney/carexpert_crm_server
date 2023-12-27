import { ApplicationException } from '../application.exception';
import { HttpStatus } from '@nestjs/common';
import { MessageErrCodeEnum } from '../enums/message-err-code.enum';

export const INCORRECT_PASSWORD_EXCEPTION_NAME = 'incorrect_password';

export class IncorrectPasswordException extends ApplicationException {
  constructor() {
    super();
  }

  getStatus(): number {
    return HttpStatus.UNAUTHORIZED;
  }

  getCode(): string {
    return INCORRECT_PASSWORD_EXCEPTION_NAME;
  }

  getMessageErrCode(): MessageErrCodeEnum {
    return MessageErrCodeEnum.INCORRECT_PASSWORD;
  }

  getMessage(): string {
    return `Incorrect password provided`;
  }
}
