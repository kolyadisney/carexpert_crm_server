import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarRequestBody } from './request-bodies/create-car.request-body';
import { CarAlreadyExistException } from '../infrastructure/exceptions';
import { UpdateCarRequestBody } from './request-bodies/update-car.request-body';

@Injectable()
export class CarService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCar(createCarRequestBody: CreateCarRequestBody) {
    const existCar = await this.prismaService.car.findFirst({
      where: {
        vin: createCarRequestBody.vin,
      },
    });

    if (existCar) {
      throw new CarAlreadyExistException('vin', createCarRequestBody.vin);
    }

    return this.prismaService.car.create({
      data: createCarRequestBody,
    });
  }

  async findCarById(id: string) {
    return this.prismaService.car.findFirst({
      where: {
        id,
      },
      include: {
        Client: true,
      },
    });
  }

  async findAllCars() {
    return this.prismaService.car.findMany();
  }

  async updateCar(id: string, updateCarRequestBody: UpdateCarRequestBody) {
    return this.prismaService.car.update({
      where: {
        id,
      },
      data: updateCarRequestBody,
    });
  }

  async deleteCar(id: string) {
    return this.prismaService.car.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
