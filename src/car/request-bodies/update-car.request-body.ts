import { CreateCarRequestBody } from './create-car.request-body';
import { PartialType } from '@nestjs/swagger';

export class UpdateCarRequestBody extends PartialType(CreateCarRequestBody) {}
