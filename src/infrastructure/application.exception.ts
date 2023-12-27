import { HttpStatus } from '@nestjs/common';
import { MessageErrCodeEnum } from './enums/message-err-code.enum';

export type ApplicationExceptionDataType = { [key: string]: unknown };

export class ApplicationException extends Error {
  constructor() {
    super();
  }

  getStatus(): number {
    return HttpStatus.BAD_REQUEST;
  }

  getCode(): string {
    return 'application_exception';
  }

  getMessage(): string {
    return null;
  }

  getMessageErrCode(): MessageErrCodeEnum {
    return MessageErrCodeEnum.NOT_SET;
  }

  getData(): ApplicationExceptionDataType {
    return {};
  }
}
