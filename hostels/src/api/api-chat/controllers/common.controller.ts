import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { UsersEmail } from 'src/api/decorators/users-email.decorator';
import { SessionGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { IMarkAsReadMessageDto } from 'src/supprot-chat/interfaces/dto/mark-as-read-message.dto';
import { ISendMessageDto } from 'src/supprot-chat/interfaces/dto/send-message.dto';
import { Message } from 'src/supprot-chat/schemas/message.schema';
import { SupportRequestClientService } from 'src/supprot-chat/support-request-client.service';
import { SupportRequestService } from 'src/supprot-chat/support-request.service';
import { UserRole } from 'src/user/enums/role.enum';
import { UserService } from 'src/user/user.service';

@Controller('common')
export class CommonChatController {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly supportRequestClientService: SupportRequestClientService,
    private readonly userService: UserService,
  ) {}

  @Get('support-requests/:id/messages')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.CLIENT, UserRole.MANAGER)
  public async getMessages(@Param('id') id: string): Promise<Message[]> {
    return await this.supportRequestService.getMessages(new Types.ObjectId(id));
  }

  @Post('support-requests/:id/messages')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.CLIENT, UserRole.MANAGER)
  public async createMessages(
    @Param('id') id: string,
    @Body() body: ISendMessageDto,
    @UsersEmail() email: string,
  ): Promise<Message[]> {
    const { _id: userId } = await this.userService.findByEmail(email);
    body.author = userId;
    body.supportRequest = id;
    return [await this.supportRequestService.sendMessage(body)];
  }

  @Post('support-requests/:id/messages/read')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.CLIENT, UserRole.MANAGER)
  public async markAsReadMessages(
    @Param('id') id: string,
    @Body() body: IMarkAsReadMessageDto,
    @UsersEmail() email: string,
  ): Promise<{ succes: boolean }> {
    const { _id: userId } = await this.userService.findByEmail(email);
    await this.supportRequestClientService.markMessagesAsRead({
      createdBefore: new Date(body.createdBefore),
      user: userId,
      supportRequest: id,
    });
    return { succes: true };
  }
}
