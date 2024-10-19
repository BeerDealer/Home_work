import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../enums/role.enum';

export type UserDocument = User & Document;

@Schema({ toObject: { versionKey: false } })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  contactPhone: string;

  @Prop({ required: true, default: UserRole.CLIENT })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
