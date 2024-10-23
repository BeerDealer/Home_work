import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserSigninDto } from 'src/user/interfaces/dto/user-signin.dto';
import { IUser } from 'src/user/interfaces/user.inreface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public checkUser(signinData: IUserSigninDto): IUser | null {
    const { email, password } = signinData;
    const user = this.userService.getOne(email);
    if (user !== undefined && user.password === password) {
      return user;
    }
    return null;
  }

  public signin(signinData: IUserSigninDto): string {
    const user = this.checkUser(signinData);
    if (user) {
      return this.createToken(signinData);
    }
    throw new HttpException('INcorrect email/pass', HttpStatus.BAD_REQUEST);
  }

  public createToken(payload: any): string {
    return this.jwtService.sign(payload);
  }
}
