import { Module } from '@nestjs/common';
import { ApiHotelModule } from './api-hotel/api-hotel.module';
import { ApiChatModule } from './api-chat/api-chat.module';

@Module({ imports: [ApiHotelModule, ApiChatModule] })
export class ApiModule {}
