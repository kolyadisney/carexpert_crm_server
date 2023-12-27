import { ApplicationException } from '../application.exception';
import { HttpStatus } from '@nestjs/common';
import { MessageErrCodeEnum } from '../enums/message-err-code.enum';

export const TOKEN_GENERATION_EXCEPTION_NAME = 'token_generation_error';

export class TokenGenerationException extends ApplicationException {
  constructor() {
    super();
  }

  getStatus(): number {
    return HttpStatus.UNAUTHORIZED;
  }

  getCode(): string {
    return TOKEN_GENERATION_EXCEPTION_NAME;
  }

  getMessageErrCode(): MessageErrCodeEnum {
    return MessageErrCodeEnum.TOKEN_GENERATION_EXCEPTION;
  }

  getMessage(): string {
    return `Something went wrong during token generation`;
  }
}
