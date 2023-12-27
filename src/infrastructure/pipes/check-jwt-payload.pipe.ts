import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { TokenPayloadException } from '../exceptions';
import { JwtTokenPayloadInterface } from '../../auth/interfaces/jwt-token-payload.interface';

@Injectable()
export class CheckJWTPayloadPipe implements PipeTransform {
  transform(
    data: JwtTokenPayloadInterface,
    metadata: ArgumentMetadata,
  ): JwtTokenPayloadInterface {
    if (typeof data.sub === 'object' && 'user_id' in data) {
      if (!data.sub.user_id) {
        throw new TokenPayloadException();
      }
    }

    return data;
  }
}
