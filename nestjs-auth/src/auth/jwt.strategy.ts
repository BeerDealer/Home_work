import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { IUserSigninDto } from 'src/user/interfaces/dto/user-signin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('SECRET'),
    });
  }

  public async validate(payload: IUserSigninDto) {
    const user = this.authService.checkUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
