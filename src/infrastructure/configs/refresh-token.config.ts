import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const refreshTokenConfig: SecuritySchemeObject = {
  description: 'Refresh Token',
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  in: 'header',
};
