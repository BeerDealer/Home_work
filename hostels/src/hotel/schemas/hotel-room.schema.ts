import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type HotelRoomDocument = HotelRoom & Document;

@Schema({
  toObject: {
    versionKey: false,
    transform: (doc, ret) => {
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  },
  timestamps: true,
})
export class HotelRoom {
  _id: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hotel', required: true })
  hotel: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ required: true, default: true })
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
