import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema({ toObject: { versionKey: false } })
export class Reservation {
  @Prop({ required: true, ref: 'User' })
  userId: ObjectId;

  @Prop({ required: true, ref: 'Hotel' })
  hotelId: ObjectId;

  @Prop({ required: true, ref: 'HotelRoom' })
  roomId: ObjectId;

  @Prop({ required: true })
  dateStart: Date;

  @Prop({ required: true })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
