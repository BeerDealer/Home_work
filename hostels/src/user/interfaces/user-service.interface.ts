import { User } from '../schemas/user.schema';
import { ID } from '../types/id.type';
import { ISearchUserParams } from './search-user-params.interface';
import { IUser } from './user.interface';

export interface IUserService {
  create(data: Partial<IUser>): Promise<User>;
  findById(id: ID): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: ISearchUserParams): Promise<User[]>;
}
