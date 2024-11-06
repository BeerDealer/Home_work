import { Module } from '@nestjs/common';
import { CommonController } from './controllers/cmmon.controller';
import { HotelModule } from 'src/hotel/hotel.module';
import { AdminController } from './controllers/admin.controller';
import { ClientController } from './controllers/clinet.controller';
import { ReservationModule } from 'src/reservation/reservation.module';
import { UserModule } from 'src/user/user.module';
import { ManagerController } from './controllers/manager.controller';

@Module({
  imports: [HotelModule, ReservationModule, UserModule],
  controllers: [
    CommonController,
    AdminController,
    ClientController,
    ManagerController,
  ],
})
export class ApiHotelModule {}
