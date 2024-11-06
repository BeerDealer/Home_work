import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema({
  toObject: {
    versionKey: false,
    transform: (doc, ret) => {
      delete ret.createdAt;
      delete ret.userId;
      delete ret.updatedAt;
      return ret;
    },
  },
  timestamps: true,
})
export class Reservation {
  _id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Hotel' })
  hotelId: ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'HotelRoom' })
  roomId: ObjectId;

  @Prop({ required: true })
  dateStart: Date;

  @Prop({ required: true })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
