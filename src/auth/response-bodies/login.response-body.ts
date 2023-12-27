import { ApiProperty } from '@nestjs/swagger';
import { CreateUserResponseBody } from '../../user/response-bodies/create-user.response-body';

export class LoginResponseBody extends CreateUserResponseBody {
  @ApiProperty()
  access_token!: string;

  @ApiProperty()
  refresh_token!: string;
}
