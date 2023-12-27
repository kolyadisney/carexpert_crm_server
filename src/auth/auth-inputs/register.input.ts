import { UserRole } from '@prisma/client';

export class RegisterInput {
  email!: string;
  phone!: string;
  first_name!: string;
  last_name!: string;
  password!: string;
  role!: UserRole;
}
