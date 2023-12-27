import {
  ApplicationException,
  ApplicationExceptionDataType,
} from '../application.exception';
import { HttpStatus } from '@nestjs/common';
import { MessageErrCodeEnum } from '../enums/message-err-code.enum';

export const CAR_ALREADY_EXIST_EXCEPTION_NAME = 'car_already_exist';

export class CarAlreadyExistException extends ApplicationException {
  constructor(public key: string, public value: string) {
    super();
  }

  getStatus(): number {
    return HttpStatus.UNAUTHORIZED;
  }

  getCode(): string {
    return CAR_ALREADY_EXIST_EXCEPTION_NAME;
  }

  getMessageErrCode(): MessageErrCodeEnum {
    return MessageErrCodeEnum.CAR_ALREADY_EXIST;
  }

  getMessage(): string {
    return `Car with ${this.key} ${this.value} already exist`;
  }

  getData(): ApplicationExceptionDataType {
    return {
      key: this.key,
      value: this.value,
    };
  }
}
