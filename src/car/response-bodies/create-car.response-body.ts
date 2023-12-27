import { ApiProperty } from '@nestjs/swagger';

export class CreateCarResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  car_number!: string;

  @ApiProperty()
  vin!: string;

  @ApiProperty()
  brand!: string;

  @ApiProperty()
  model!: string;

  @ApiProperty()
  year!: string;

  @ApiProperty()
  color!: string;

  @ApiProperty()
  client_id!: string;

  @ApiProperty()
  created_at!: Date;

  @ApiProperty()
  updated_at!: Date;

  @ApiProperty()
  deleted_at!: Date;
}
