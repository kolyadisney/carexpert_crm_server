import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CheckJWTPayloadPipe } from '../infrastructure/pipes/check-jwt-payload.pipe';
import { JwtTokenPayloadDecorator } from '../auth/decorators/jwt-token-payload.decorator';
import { JwtTokenPayloadInterface } from '../auth/interfaces/jwt-token-payload.interface';
import { JwtAuthName } from '../auth/strategies/jwt.strategy';
import { CreateUserResponseBody } from './response-bodies/create-user.response-body';
import { UpdateUserRequestBody } from './request-bodies/update-user.request-body';
import { UpdateUserResponseBody } from './response-bodies/update-user.response-body';
import { RolePermissionsGuard } from '../infrastructure/permissions/guards/role-permissions.guard';
import { PermissionsDecorator } from '../infrastructure/permissions/decorators/permissions.decorator';
import { UserRole } from '@prisma/client';
import { DeleteUserResponseBody } from './response-bodies/delete-user.response-body';

@ApiBearerAuth(JwtAuthName)
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({
    description: 'Get a full response for current user',
  })
  @ApiOkResponse({ type: CreateUserResponseBody })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(
    @JwtTokenPayloadDecorator() jwtTokenPayload: JwtTokenPayloadInterface,
  ) {
    return this.userService.findOneUser('id', jwtTokenPayload.sub.user_id);
  }

  @ApiOperation({
    description: 'Get all user',
  })
  @ApiOkResponse({ type: [CreateUserResponseBody] })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @ApiOperation({
    description: 'Get user by id',
  })
  @ApiOkResponse({ type: CreateUserResponseBody })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneUser(@Param('id') id: string) {
    return this.userService.findOneUser('id', id);
  }

  @ApiOperation({
    description: 'Update user by id',
  })
  @ApiOkResponse({ type: UpdateUserResponseBody })
  @UseGuards(RolePermissionsGuard)
  @PermissionsDecorator(UserRole.OWNER)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserRequestBody: UpdateUserRequestBody,
  ) {
    return this.userService.updateUser(id, updateUserRequestBody);
  }

  @ApiOperation({
    description: 'Delete user by id',
  })
  @ApiOkResponse({ type: DeleteUserResponseBody })
  @UseGuards(RolePermissionsGuard)
  @PermissionsDecorator(UserRole.OWNER)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
