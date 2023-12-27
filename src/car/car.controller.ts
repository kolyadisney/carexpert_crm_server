import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarRequestBody } from './request-bodies/create-car.request-body';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtAuthName } from '../auth/strategies/jwt.strategy';
import { CreateCarResponseBody } from './response-bodies/create-car.response-body';
import { UpdateCarRequestBody } from './request-bodies/update-car.request-body';

@ApiBearerAuth(JwtAuthName)
@Controller('car')
@ApiTags('Car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({
    description: 'Create new car',
  })
  @ApiOkResponse({ type: CreateCarResponseBody })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createCar(@Body() createCarRequestBody: CreateCarRequestBody) {
    return this.carService.createCar(createCarRequestBody);
  }

  @ApiOperation({
    description: 'Find car by ID',
  })
  @ApiOkResponse({ type: CreateCarResponseBody })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAllCars() {
    return this.carService.findAllCars();
  }

  @ApiOperation({
    description: 'Find car by ID',
  })
  @ApiOkResponse({ type: CreateCarResponseBody })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findCarById(@Param('id') id: string) {
    return this.carService.findCarById(id);
  }

  @ApiOperation({
    description: 'Update car by ID',
  })
  @ApiOkResponse({ type: CreateCarResponseBody })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCar(
    @Body() updateCarRequestBody: UpdateCarRequestBody,
    @Param('id') id: string,
  ) {
    return this.carService.updateCar(id, updateCarRequestBody);
  }

  @ApiOperation({
    description: 'Delete car by ID',
  })
  @ApiOkResponse({ type: CreateCarResponseBody })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCar(@Param('id') id: string) {
    return this.carService.deleteCar(id);
  }
}
