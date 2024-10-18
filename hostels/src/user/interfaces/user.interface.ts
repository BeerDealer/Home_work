import { ObjectId } from 'mongoose';
import { UserRole } from '../enums/role.enum';

export interface IUser {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  contactPhone: string;
  role: UserRole;
}
