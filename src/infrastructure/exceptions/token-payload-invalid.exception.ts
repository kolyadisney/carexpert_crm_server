import { ApplicationException } from '../application.exception';
import { MessageErrCodeEnum } from '../enums/message-err-code.enum';

export const TOKEN_PAYLOAD_EXCEPTION_NAME = 'token_payload_error';

export class TokenPayloadException extends ApplicationException {
  constructor() {
    super();
  }

  getCode(): string {
    return TOKEN_PAYLOAD_EXCEPTION_NAME;
  }

  getMessageErrCode(): MessageErrCodeEnum {
    return MessageErrCodeEnum.TOKEN_PAYLOAD_EXCEPTION;
  }

  getMessage(): string {
    return `Invalid Token Payload data`;
  }
}
