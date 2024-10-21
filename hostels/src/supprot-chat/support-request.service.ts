import { Injectable } from '@nestjs/common';
import { ISupportRequestService } from './interfaces/support-request-service.interface';
import { ID } from 'src/types/id.type';
import { ISendMessageDto } from './interfaces/dto/send-message.dto';
import { IGetChatListParams } from './interfaces/get-chat-list-params.interface';
import { Message, MessageDocument } from './schemas/message.schema';
import {
  SupportRequest,
  SupportRequsetDocument,
} from './schemas/support-request.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly SupportRequestModel: Model<SupportRequsetDocument>,
    @InjectModel(Message.name)
    private readonly MessageModel: Model<MessageDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public async findSupportRequests(
    params: IGetChatListParams,
  ): Promise<SupportRequest[]> {
    const supportRequest = await this.SupportRequestModel.find({
      userId: params.user,
      isActive: params.isActive,
    });
    return supportRequest;
  }

  public async sendMessage(data: ISendMessageDto): Promise<Message> {
    const message = new this.MessageModel(data);
    return await message.save();
  }

  public async getMessages(supportRequest: ID): Promise<Message[]> {
    const { messages } =
      await this.SupportRequestModel.findById(supportRequest).populate(
        'messages',
      );
    return messages;
  }

  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    throw new Error('Method not implemented.');
  }
}
