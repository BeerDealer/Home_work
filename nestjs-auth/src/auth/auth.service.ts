import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public checkUser(email: string, password: string) {
    const user = this.userService.getOne(email);
    if (user !== undefined && user.password === password) {
      return user;
    }
  }
}
