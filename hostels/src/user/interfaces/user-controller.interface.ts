import { User } from '../schemas/user.schema';
import { ID } from '../types/id.type';
import { IUserCreateDto } from './dto/user-create.dto';
import { ISearchUserParams } from './search-user-params.interface';

export interface IUserController {
  create(body: IUserCreateDto): Promise<User>;
  findById(id: ID): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(query: ISearchUserParams): Promise<User>;
}
