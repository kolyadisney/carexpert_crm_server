import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../infrastructure/configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { PassportStrategies } from './strategies';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: jwtConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    UserModule,
    PassportModule,
  ],
  providers: [AuthService, ...PassportStrategies],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
