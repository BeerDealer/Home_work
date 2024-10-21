import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserCreateDto } from './interfaces/dto/user-create.dto';
import { UserValidationPipe } from './validation/user.validation.pipe';
import { userValidationSchema } from './validation/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  public getAll() {
    return this.userService.getAll();
  }

  @Post('signup')
  @UsePipes(new UserValidationPipe(userValidationSchema))
  public signup(@Body() data: IUserCreateDto) {
    this.userService.saveOne(data);
    return { signup: 'Success' };
  }
}
