import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SessionGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { SupportRequest } from 'src/supprot-chat/schemas/support-request.schema';
import { SupportRequestService } from 'src/supprot-chat/support-request.service';
import { UserRole } from 'src/user/enums/role.enum';
import { UserService } from 'src/user/user.service';

@Controller('manager')
export class ManagerChatController {
  constructor(
    private readonly userService: UserService,
    private readonly supportRequestService: SupportRequestService,
  ) {}

  @Get('support-requests')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.MANAGER)
  public async getRequests(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('isActive') isActive?: boolean,
  ) {
    Promise<Partial<SupportRequest>[]>;
    const supportRequests =
      await this.supportRequestService.findSupportRequests({
        offset: offset,
        limit: limit,
        isActive: isActive,
      });
    const tasks = supportRequests.map(async (supportRequest) => {
      const messages = await this.supportRequestService.getMessages(
        supportRequest._id,
      );
      const user = await this.userService.findById(supportRequest.userId);
      const hasNewMessages = !messages.every((message) => message.readAt);
      return {
        _id: supportRequest._id,
        createdAt: supportRequest.createdAt,
        isActive: supportRequest.isActive,
        hasNewMessages,
        client: {
          _id: user._id,
          name: user.name,
          email: user.email,
          contactPhone: user.contactPhone,
        },
      };
    });

    return Promise.all(tasks);
  }
}
