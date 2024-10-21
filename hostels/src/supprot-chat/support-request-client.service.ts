import { Injectable } from '@nestjs/common';
import { ID } from 'src/types/id.type';
import { Message, MessageDocument } from './schemas/message.schema';
import {
  SupportRequest,
  SupportRequsetDocument,
} from './schemas/support-request.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ISupportRequestClientService } from './interfaces/support-request-client-service.interface';
import { ICreateSupportRequestDto } from './interfaces/dto/create-support-request.dto';
import { IMarkMessagesAsReadDto } from './interfaces/dto/mark-message-as-read.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly SupportRequestModel: Model<SupportRequsetDocument>,
    @InjectModel(Message.name)
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  public async createSupportRequest(
    data: ICreateSupportRequestDto,
  ): Promise<SupportRequest> {
    const supportRequest = new this.SupportRequestModel(data);
    return await supportRequest.save();
  }

  public async markMessagesAsRead(
    params: IMarkMessagesAsReadDto,
  ): Promise<void> {
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
    const { messages } =
      await this.SupportRequestModel.findById(supportRequest);
    return messages.length;
  }
}
