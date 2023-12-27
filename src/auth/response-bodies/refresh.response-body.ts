import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RefreshResponseBody {
  @Expose()
  @ApiProperty()
  access_token!: string;

  @Expose()
  @ApiProperty()
  refresh_token!: string;
}
