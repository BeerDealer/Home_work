import { Module } from '@nestjs/common';
import { ApiHotelModule } from './api-hotel/api-hotel.module';
import { ApiChatModule } from './api-chat/api-chat.module';
import { EmployeeModule } from './employee/employee.module';

@Module({ imports: [ApiHotelModule, ApiChatModule, EmployeeModule] })
export class ApiModule {}
