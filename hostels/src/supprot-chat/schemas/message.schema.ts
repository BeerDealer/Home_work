import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  _id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  author: ObjectId;

  @Prop({ required: true })
  sentAt: Date;

  @Prop({ required: true })
  text: string;

  @Prop()
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
