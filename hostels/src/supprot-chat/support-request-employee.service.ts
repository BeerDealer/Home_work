import { Injectable } from '@nestjs/common';
import { ISupportRequestEmployeeService } from './interfaces/support-request-employee-service.interface';
import { ID } from 'src/types/id.type';
import { IMarkMessagesAsReadDto } from './interfaces/dto/mark-message-as-read.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequsetDocument,
} from './schemas/support-request.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly SupportRequestModel: Model<SupportRequsetDocument>,
    @InjectConnection() connection: Connection,
  ) {}

  public async markMessagesAsRead(params: IMarkMessagesAsReadDto) {
    const supportRequest = await this.SupportRequestModel.findById(
      params.supportRequest,
    );

    const currentDate = new Date();

    const unreadMessages = supportRequest.messages.filter((message) => {
      return (
        message.author.toString() === params.user.toString() &&
        !message.readAt &&
        message.sentAt < params.createdBefore
      );
    });

    unreadMessages.forEach((message) => {
      message.readAt = currentDate;
    });

    await supportRequest.save();
  }

  public async getUnreadCount(supportRequest: ID): Promise<number> {
    const messages = (
      await this.SupportRequestModel.findById(supportRequest)
    ).populated('message');
    const unreadMessagesCount = messages.filter((message) => {
      return !message.readAt;
    }).length;
    return unreadMessagesCount;
  }

  public async closeRequest(supportRequest: ID): Promise<void> {
    await this.SupportRequestModel.findByIdAndUpdate(supportRequest, {
      isActive: false,
    });
  }
}
