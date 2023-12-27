import { ApplicationException } from '../application.exception';
import { MessageErrCodeEnum } from '../enums/message-err-code.enum';

export const TOKEN_TYPE_INCORRECT_EXCEPTION_NAME = 'token_type_incorrect_error';

export class TokenTypeIncorrectException extends ApplicationException {
  constructor() {
    super();
  }

  getCode(): string {
    return TOKEN_TYPE_INCORRECT_EXCEPTION_NAME;
  }

  getMessageErrCode(): MessageErrCodeEnum {
    return MessageErrCodeEnum.TOKEN_TYPE_INCORRECT;
  }

  getMessage(): string {
    return `Incorrect token type`;
  }
}
