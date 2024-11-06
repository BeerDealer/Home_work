import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SessionGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';

import { UserRole } from 'src/user/enums/role.enum';
import { IUserCreateDto } from 'src/user/interfaces/dto/user-create.dto';
import { ISearchUserParams } from 'src/user/interfaces/search-user-params.interface';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Controller()
export class UserManagementController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @Get('admin/users')
  @Get('manager/users')
  public async findAll(@Query() query: ISearchUserParams): Promise<User[]> {
    return await this.userService.findAll(query);
  }

  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @Post('admin/users')
  public async createUser(@Body() body: IUserCreateDto): Promise<User> {
    return await this.userService.create(body);
  }
}
