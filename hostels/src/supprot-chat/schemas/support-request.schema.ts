import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Message } from './message.schema';

export type SupportRequsetDocument = SupportRequest & Document;

@Schema({ timestamps: true })
export class SupportRequest {
  _id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Message' })
  messages: Message[];

  @Prop()
  isActive: boolean;

  createdAt: Date;
}

export const SupportRequsetSchema =
  SchemaFactory.createForClass(SupportRequest);
