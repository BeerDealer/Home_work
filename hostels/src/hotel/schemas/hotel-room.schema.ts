import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type HotelRoomDocument = HotelRoom & Document;

@Schema({ toObject: { versionKey: false }, timestamps: true })
export class HotelRoom {
  @Prop({ ref: 'Hotel' })
  hotel: ObjectId;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ required: true, default: true })
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
