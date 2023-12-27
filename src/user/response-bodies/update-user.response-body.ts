import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserResponseBody {
  @ApiProperty({ format: 'uuid' })
  id!: string;
}
