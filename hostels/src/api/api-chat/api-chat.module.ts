import { Module } from '@nestjs/common';
import { ClientChatController } from './controllers/client.controller';
import { SupprotChatModule } from 'src/supprot-chat/supprot-chat.module';
import { UserModule } from 'src/user/user.module';
import { ManagerChatController } from './controllers/manager.controller';
import { CommonChatController } from './controllers/common.controller';

@Module({
  imports: [SupprotChatModule, UserModule],
  controllers: [
    ClientChatController,
    ManagerChatController,
    CommonChatController,
  ],
})
export class ApiChatModule {}
