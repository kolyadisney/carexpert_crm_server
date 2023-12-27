import { PartialType } from '@nestjs/swagger';
import { CreateClientRequestBody } from './create-client.request-body';

export class UpdateClientRequestBody extends PartialType(
  CreateClientRequestBody,
) {}
