import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategyName } from '../strategies/local.strategy';

@Injectable()
export class LocalAuthGuard extends AuthGuard(LocalStrategyName) {}
