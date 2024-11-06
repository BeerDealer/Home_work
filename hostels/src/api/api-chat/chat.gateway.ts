import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BadGatewayException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SessionGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { UserRole } from 'src/user/enums/role.enum';
import { UsersEmail } from '../decorators/users-email.decorator';
import { SupportRequest } from 'src/supprot-chat/schemas/support-request.schema';
import { Message } from 'src/supprot-chat/schemas/message.schema';
import { UserService } from 'src/user/user.service';
import { SupportRequestService } from 'src/supprot-chat/support-request.service';

@WebSocketGateway()
export class ChatGateway {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server;

  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.CLIENT, UserRole.MANAGER)
  @SubscribeMessage('subscribeToChat')
  async handleSubscribeToChat() {
    try {
      const unsubscribe = this.supportRequestService.subscribe(
        async (_supportRequest: SupportRequest, message: Message) => {
          const author = await this.userService.findById(
            String(message.author),
          );
          const messageData = {
            id: message['_id'].toString(),
            createdAt: message.sentAt,
            text: message.text,
            readAt: message.readAt ? message.readAt : null,
            author: {
              id: author._id,
              name: author.name,
            },
          };
          this.server.emit('chatMessage', messageData);
        },
      );

      return unsubscribe;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
