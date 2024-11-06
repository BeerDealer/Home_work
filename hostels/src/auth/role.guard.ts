import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/enums/role.enum';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.session.user as User;

    if (!user || !roles || !roles.includes(user.role)) {
      throw new HttpException(
        'У Вас нет прав для этого ресурса',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
