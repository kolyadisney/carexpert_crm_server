import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserResponseBody {
  @ApiProperty({ format: 'uuid' })
  id: string;
}
