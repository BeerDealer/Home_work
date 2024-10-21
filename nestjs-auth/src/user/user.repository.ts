import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.inreface';

@Injectable()
export class UserRepository {
  private users: IUser[] = [];

  public saveOne(user: IUser): void {
    this.checkEmail(user.email);
    this.users.push(user);
  }

  public getAll(): IUser[] {
    return this.users;
  }

  public getOne(email: string): IUser | undefined {
    return this.users.find((user) => user.email === email);
  }

  private checkEmail(email: string) {
    this.users.forEach((user) => {
      if (user.email === email) {
        throw new HttpException(
          'This email already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
}
