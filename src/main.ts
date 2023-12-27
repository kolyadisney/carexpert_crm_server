import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { accessTokenConfig } from './infrastructure/configs/access-token.config';
import { refreshTokenConfig } from './infrastructure/configs/refresh-token.config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = await app.resolve<ConfigService>(ConfigService);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  const port = configService.get<number>('PORT');
  const timeout = configService.get<number>('SERVER_TIMEOUT_IN_SECONDS');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Carexpert API')
    .setDescription('The Carexpert API description')
    .setVersion(configService.get<string>('APP_VERSION'))
    .addTag('carexpert')
    .addBearerAuth(accessTokenConfig, 'access_token')
    .addBearerAuth(refreshTokenConfig, 'refresh_token')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swggr', app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  const server: Server = <
    Server<typeof IncomingMessage, typeof ServerResponse>
  >await app.listen(port, () => {
    console.log(
      `Listening at ${configService.get<string>('BASE_URL')}:${port}, START 🚀`,
    );
    console.log(
      `Listening Swagger at ${configService.get<string>(
        'BASE_URL',
      )}:${port}/swggr, START 🚀`,
    );
  });

  server.setTimeout(timeout * 1000);
}
bootstrap().catch(console.error);
