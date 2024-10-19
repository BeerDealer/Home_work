import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelModule } from './hotel/hotel.module';
import { HotelRoomService } from './hotel-room/hotel-room.service';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECT),
    UserModule,
    HotelModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService, HotelRoomService],
})
export class AppModule {}
