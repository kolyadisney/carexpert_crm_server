import { ApiProperty } from '@nestjs/swagger';

export class CreateClientResponseBody {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  deleted_at: Date;
}
