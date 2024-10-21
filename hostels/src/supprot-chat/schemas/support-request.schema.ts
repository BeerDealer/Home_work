import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Message } from './message.schema';

export type SupportRequsetDocument = SupportRequest & Document;

@Schema({ timestamps: true })
export class SupportRequest {
  @Prop({ required: true, ref: 'User' })
  userId: ObjectId;

  @Prop({ type: Message, ref: 'Message' })
  messages: Message[];

  @Prop()
  isActive: boolean;
}

export const SupportRequsetSchema =
  SchemaFactory.createForClass(SupportRequest);
