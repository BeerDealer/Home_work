import { Module } from '@nestjs/common';
import { ApiHotelModule } from './api-hotel/api-hotel.module';

@Module({ imports: [ApiHotelModule] })
export class ApiModule {}
