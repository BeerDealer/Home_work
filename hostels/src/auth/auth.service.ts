import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    const passwordHash = await bcrypt.compare(password, user.passwordHash);
    if (user && passwordHash) {
      return user;
    }
    return null;
  }

  async logout(request: Request, response: Response): Promise<any> {
    try {
      request.session.destroy(() => {
        response.status(HttpStatus.OK).json({
          message: 'Вы успешно вышли',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
