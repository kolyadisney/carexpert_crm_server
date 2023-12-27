import { TokenTypeEnum } from '../../infrastructure/enums/token-type.enum';
import { UserRole } from '@prisma/client';

export interface JwtTokenPayloadInterface {
  email: string;
  sub: {
    user_id: string;
    user_role: UserRole;
    type: TokenTypeEnum;
  };
}
