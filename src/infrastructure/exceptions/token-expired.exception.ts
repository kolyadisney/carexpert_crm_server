import { ApplicationException } from '../application.exception';
import { MessageErrCodeEnum } from '../enums/message-err-code.enum';

export const TOKEN_EXPIRED_EXCEPTION_NAME = 'token_expired';

export class TokenExpiredException extends ApplicationException {
  constructor() {
    super();
  }

  getCode(): string {
    return TOKEN_EXPIRED_EXCEPTION_NAME;
  }

  getMessageErrCode(): MessageErrCodeEnum {
    return MessageErrCodeEnum.TOKEN_EXPIRED;
  }

  getMessage(): string {
    return `Token expired`;
  }
}
