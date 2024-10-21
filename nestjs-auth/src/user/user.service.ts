import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interfaces/user.inreface';
import { UserRepository } from './user.repository';
import { IUserCreateDto } from './interfaces/dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  public saveOne(data: IUserCreateDto) {
    const newUser: IUser = { id: uuidv4(), ...data };
    this.userRepository.saveOne(newUser);
  }

  public getAll(): IUser[] {
    return this.userRepository.getAll();
  }

  public getOne(email: string): IUser | undefined {
    return this.userRepository.getOne(email);
  }
}
