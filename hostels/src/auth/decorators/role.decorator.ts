import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/enums/role.enum';

export const Role = (...roles: UserRole[]) => SetMetadata('roles', roles);
