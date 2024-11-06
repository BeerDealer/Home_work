import { UserRole } from 'src/user/enums/role.enum';

export interface IUserCreateDto {
  email: string;
  password: string;
  name: string;
  contactPhone: string;
  role?: UserRole;
}
