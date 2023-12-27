import {
  ApplicationException,
  ApplicationExceptionDataType,
} from '../application.exception';
import { HttpStatus } from '@nestjs/common';
import { MessageErrCodeEnum } from '../enums/message-err-code.enum';

export const USER_ALREADY_EXIST_EXCEPTION_NAME = 'user_already_exist';

export class UserAlreadyExistException extends ApplicationException {
  constructor(public key: string, public value: string) {
    super();
  }

  getStatus(): number {
    return HttpStatus.BAD_REQUEST;
  }

  getCode(): string {
    return USER_ALREADY_EXIST_EXCEPTION_NAME;
  }

  getMessageErrCode(): MessageErrCodeEnum {
    return MessageErrCodeEnum.USER_ALREADY_EXIST;
  }

  getMessage(): string {
    return `User with ${this.key} ${this.value} already exist`;
  }

  getData(): ApplicationExceptionDataType {
    return {
      key: this.key,
      value: this.value,
    };
  }
}
