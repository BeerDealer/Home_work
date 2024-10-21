import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jswFromRequests: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'asd',
    });
  }

  public async validate(payload: any) {}
}
