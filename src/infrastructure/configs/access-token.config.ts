import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const accessTokenConfig: SecuritySchemeObject = {
  description: 'Access Token',
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  in: 'header',
};
