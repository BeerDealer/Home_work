import { UserRole } from 'src/user/enums/role.enum';

export interface IUserCreateDto {
  email: string;
  passwordHash: string;
  name: string;
  contactPhone: string;
  role: UserRole;
}
