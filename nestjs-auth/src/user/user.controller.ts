import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUserCreateDto } from './interfaces/dto/user-create.dto';
import { UserValidationPipe } from './validation/user.validation.pipe';
import { userValidationSchema } from './validation/schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { IUserSigninDto } from './interfaces/dto/user-signin.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

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

  @Post('signin')
  public signin(@Body() body: IUserSigninDto) {
    return this.authService.signin(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('secret-data')
  public secretData() {
    return 'success';
  }
}
