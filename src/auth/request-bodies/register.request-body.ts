import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '@prisma/client';
import { CreateUserRequestBody } from '../../user/request-bodies/create-user.request-body';

export class RegisterRequestBody extends CreateUserRequestBody {}
