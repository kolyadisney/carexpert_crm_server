import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientRequestBody } from './request-bodies/create-client.request-body';
import { UserAlreadyExistException } from '../infrastructure/exceptions';
import { PaginateQueryParamPart } from '../infrastructure/query-params/pagination-params';
import { UpdateClientRequestBody } from './request-bodies/update-client.request-body';
import { setSkipTake } from '../infrastructure/helpers';

@Injectable()
export class ClientService {
  constructor(private readonly prismaService: PrismaService) {}

  async createClient(clientRequestBody: CreateClientRequestBody) {
    const existClient = await this.prismaService.client.findFirst({
      where: {
        phone: clientRequestBody.phone,
      },
    });
    if (existClient) {
      throw new UserAlreadyExistException('phone', clientRequestBody.phone);
    }

    return this.prismaService.client.create({
      data: clientRequestBody,
      include: {
        cars: true,
        _count: true,
      },
    });
  }

  async findClientById(id: string) {
    return this.prismaService.client.findFirst({
      where: {
        id,
      },
      include: {
        cars: true,
      },
    });
  }

  async findAllClients(paginationParams: PaginateQueryParamPart) {
    paginationParams.page = Number(paginationParams?.page);
    paginationParams.limit = Number(paginationParams.limit);
    if (!paginationParams.searchText) {
      paginationParams.searchText = '';
    }
    if (!paginationParams.page) {
      paginationParams.page = 1;
    }
    if (!paginationParams.limit) {
      paginationParams.limit = 10;
    }

    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const [clients, total] = await Promise.all([
      this.prismaService.client.findMany({
        where: {
          OR: [
            {
              email: {
                contains: paginationParams.searchText,
                mode: 'insensitive',
              },
            },
            {
              first_name: {
                contains: paginationParams.searchText,
                mode: 'insensitive',
              },
            },
            {
              last_name: {
                contains: paginationParams.searchText,
                mode: 'insensitive',
              },
            },
            {
              phone: {
                contains: paginationParams.searchText,
                mode: 'insensitive',
              },
            },
          ],
        },
        include: {
          cars: true,
        },
        skip,
        take: paginationParams.limit,
      }),
      this.prismaService.client.count(),
    ]);
    return {
      data: clients,
      meta: {
        total: total,
        page: paginationParams.page,
        limit: paginationParams.limit,
      },
    };
  }

  async updateClient(
    id: string,
    updateClientRequestBody: UpdateClientRequestBody,
  ) {
    return this.prismaService.client.update({
      where: {
        id,
      },
      data: updateClientRequestBody,
      select: {
        id: true,
      },
    });
  }

  async deleteClient(id: string) {
    return this.prismaService.client.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
