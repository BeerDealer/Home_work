import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from 'src/user/enums/role.enum';
import { User } from 'src/user/schemas/user.schema';

export const UserLogged = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.session.user as User;
  return !user ? UserRole.CLIENT : user.role;
});
