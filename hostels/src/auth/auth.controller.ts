import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  BadRequestException,
} from '@nestjs/common';
import { IUserLoginDto } from './dto/user-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { IUserCreateDto } from 'src/user/interfaces/dto/user-create.dto';
import { UserRole } from 'src/user/enums/role.enum';
import { IUser } from 'src/user/interfaces/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(
    @Body() body: IUserLoginDto,
    @Request() req,
    @Response() res,
  ) {
    res.cookie('sessionId', req.sessionID);

    const { email, name, contactPhone } = req.user;
    req.session.user = req.user;
    return res.json({ email, name, contactPhone });
  }

  @Post('logout')
  public async logout(@Request() req, @Response() res) {
    await this.authService.logout(req, res);
  }

  @Post('register')
  public async register(@Body() body: IUserCreateDto) {
    body.role = UserRole.CLIENT;
    const createdUser = await this.usersService.create(body);
    return {
      id: createdUser._id,
      email: createdUser.email,
      name: createdUser.name,
    };
  }
}
