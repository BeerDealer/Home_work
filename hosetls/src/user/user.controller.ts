import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { IUserController } from './interfaces/user-controller.interface';
import { IUserCreateDto } from './interfaces/dto/user-create.dto';
import { ISearchUserParams } from './interfaces/search-user-params.interface';
import { User, UserSchema } from './schemas/user.schema';
import { ID } from './types/id.type';
import { UserValidationPipe } from './validation/user.validation.pipe';
import { userValidationSchema } from './validation/schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new UserValidationPipe(userValidationSchema))
  public async create(@Body() body: IUserCreateDto): Promise<User> {
    const user = this.create(body);
    return user;
  }

  findById(id: ID): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAll(query: ISearchUserParams): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
