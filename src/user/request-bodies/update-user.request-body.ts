import { CreateUserRequestBody } from './create-user.request-body';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateUserRequestBody extends PartialType(CreateUserRequestBody) {}
