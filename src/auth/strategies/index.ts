import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtStrategyOptional } from './jwt.strategy-optional';

export const PassportStrategies = [
  LocalStrategy,
  JwtStrategy,
  JwtStrategyOptional,
  JwtRefreshStrategy,
];
