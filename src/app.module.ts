import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { Filters } from './infrastructure/filters';
import { ClientModule } from './client/client.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    ClientModule,
    CarModule,
  ],
  controllers: [],
  providers: [...Filters],
})
export class AppModule {}
