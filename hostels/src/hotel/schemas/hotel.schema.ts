import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type HotelDocument = Hotel & Document;

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
export class Hotel {
  _id: ObjectId;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  description: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
