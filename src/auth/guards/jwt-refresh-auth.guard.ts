import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtRefreshStrategyName } from '../strategies/jwt-refresh.strategy';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard(JwtRefreshStrategyName) {}
