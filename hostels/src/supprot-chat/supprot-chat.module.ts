import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import {
  SupportRequest,
  SupportRequsetSchema,
} from './schemas/support-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
      { name: SupportRequest.name, schema: SupportRequsetSchema },
    ]),
  ],
})
export class SupprotChatModule {}
