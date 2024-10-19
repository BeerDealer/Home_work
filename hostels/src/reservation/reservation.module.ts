import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { Hotel, HotelSchema } from 'src/hotel/schemas/hotel.schema';
import {
  HotelRoom,
  HotelRoomSchema,
} from 'src/hotel/schemas/hotel-room.schema';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  providers: [ReservationService],
})
export class ReservationModule {}
