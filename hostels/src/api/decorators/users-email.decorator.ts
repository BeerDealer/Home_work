import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';

export const UsersEmail = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.session.user as User;
  return user.email;
});
