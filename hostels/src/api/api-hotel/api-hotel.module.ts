import { Module } from '@nestjs/common';
import { CommonController } from './controllers/cmmon.controller';
import { HotelModule } from 'src/hotel/hotel.module';
import { AdminController } from './controllers/admin.controller';

@Module({
  imports: [HotelModule],
  controllers: [CommonController, AdminController],
})
export class ApiHotelModule {}
