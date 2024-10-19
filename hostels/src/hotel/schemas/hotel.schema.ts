import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema({ toObject: { versionKey: false }, timestamps: true })
export class Hotel {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  description: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);