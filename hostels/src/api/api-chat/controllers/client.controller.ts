import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersEmail } from 'src/api/decorators/users-email.decorator';
import { SessionGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { ICreateSupportRequestDto } from 'src/supprot-chat/interfaces/dto/create-support-request.dto';
import { IGetChatListParams } from 'src/supprot-chat/interfaces/get-chat-list-params.interface';
import { SupportRequest } from 'src/supprot-chat/schemas/support-request.schema';
import { SupportRequestClientService } from 'src/supprot-chat/support-request-client.service';
import { SupportRequestService } from 'src/supprot-chat/support-request.service';
import { UserRole } from 'src/user/enums/role.enum';
import { UserService } from 'src/user/user.service';

@Controller('client')
export class ClientChatController {
  constructor(
    private readonly supportRequestClientService: SupportRequestClientService,
    private readonly userService: UserService,
    private readonly supportRequestService: SupportRequestService,
  ) {}

  @Post('support-requests')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.CLIENT)
  public async createRequest(
    @Body() body: ICreateSupportRequestDto,
    @UsersEmail() email: string,
  ): Promise<Partial<SupportRequest> & { hasNewMessages: boolean }> {
    const { _id: userId } = await this.userService.findByEmail(email);
    body.userId = userId;
    const { _id, createdAt, isActive } =
      await this.supportRequestClientService.createSupportRequest(body);
    return { _id, createdAt, isActive, hasNewMessages: false };
  }

  @Get('support-requests')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.CLIENT)
  public async getRequests(
    @UsersEmail() email: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('isActive') isActive?: boolean,
  ) {
    Promise<Partial<SupportRequest>[]>;
    const { _id: userId } = await this.userService.findByEmail(email);
    const supportRequests =
      await this.supportRequestService.findSupportRequests({
        userId: userId,
        offset: offset,
        limit: limit,
        isActive: isActive,
      });
    const tasks = supportRequests.map(async (supportRequest) => {
      const messages = await this.supportRequestService.getMessages(
        supportRequest._id,
      );
      const hasNewMessages = !messages.every((message) => message.readAt);
      return {
        _id: supportRequest._id,
        createdAt: supportRequest.createdAt,
        isActive: supportRequest.isActive,
        hasNewMessages,
      };
    });

    return Promise.all(tasks);
  }
}
