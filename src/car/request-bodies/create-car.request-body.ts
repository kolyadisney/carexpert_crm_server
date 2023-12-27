import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCarRequestBody {
  @ApiProperty()
  @IsString()
  car_number!: string;

  @ApiProperty()
  @Length(17, 17)
  @IsString()
  vin!: string;

  @ApiProperty()
  @IsString()
  brand!: string;

  @ApiProperty()
  @IsString()
  model!: string;

  @ApiProperty()
  @IsString()
  year!: string;

  @ApiProperty()
  @IsString()
  color!: string;

  @ApiProperty()
  @IsString()
  client_id!: string;
}
