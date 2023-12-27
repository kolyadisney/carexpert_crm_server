import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserRequestBody } from './request-bodies/update-user.request-body';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllUsers() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        first_name: true,
        last_name: true,
        created_at: true,
        deleted_at: true,
        updated_at: true,
      },
    });
  }

  async findOneUser(key: string, value: string): Promise<User | any> {
    const where = {
      [key]: value,
    };

    const user = await this.prismaService.user.findFirst({
      where: where,
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        first_name: true,
        last_name: true,
        created_at: true,
        deleted_at: true,
        updated_at: true,
      },
    });

    return user;
  }

  async updateUser(id: string, updateUserRequestBody: UpdateUserRequestBody) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserRequestBody,
      select: {
        id: true,
      },
    });
  }

  async deleteUser(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
