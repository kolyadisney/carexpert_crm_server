import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientRequestBody } from './request-bodies/create-client.request-body';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthName } from '../auth/strategies/jwt.strategy';
import { CreateClientResponseBody } from './response-bodies/create-client.response-body';
import { PaginateQueryParamPart } from '../infrastructure/query-params/pagination-params';
import { UpdateClientRequestBody } from './request-bodies/update-client.request-body';

@ApiBearerAuth(JwtAuthName)
@Controller('client')
@ApiTags('Client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({
    description: 'Create client',
  })
  @ApiOkResponse({ type: CreateClientResponseBody })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createClient(@Body() createClientRequestBody: CreateClientRequestBody) {
    return this.clientService.createClient(createClientRequestBody);
  }

  @ApiOperation({
    description: 'Find client by id',
  })
  @ApiOkResponse({ type: CreateClientResponseBody })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findClientById(@Param('id') id: string) {
    return this.clientService.findClientById(id);
  }

  @ApiOperation({
    description: 'Find all clients',
  })
  @ApiOkResponse({ type: [CreateClientResponseBody] })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAllClients(@Query() paginationParams: PaginateQueryParamPart) {
    return this.clientService.findAllClients(paginationParams);
  }

  @ApiOperation({
    description: 'Update client',
  })
  @ApiOkResponse({ type: CreateClientResponseBody })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientRequestBody: UpdateClientRequestBody,
  ) {
    return this.clientService.updateClient(id, updateClientRequestBody);
  }

  @ApiOperation({
    description: 'Delete client',
  })
  @ApiOkResponse({ type: CreateClientResponseBody })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(id);
  }
}
