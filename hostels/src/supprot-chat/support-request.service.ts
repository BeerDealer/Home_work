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
    const query: any = {};
    if (params.userId) query.userId = params.userId;
    if (params.isActive) query.isActive = params.isActive;
    const supportRequest = await this.SupportRequestModel.find(query)
      .skip(params.offset)
      .limit(params.limit);
    return supportRequest;
  }

  public async sendMessage(data: ISendMessageDto): Promise<Message> {
    const message = new this.MessageModel({
      ...data,
      sentAt: new Date(),
      readAt: null,
    });
    await message.save();
    await this.SupportRequestModel.findByIdAndUpdate(data.supportRequest, {
      $push: { messages: message._id },
    });
    return message;
  }

  public async getMessages(supportRequest: ID): Promise<Message[]> {
    const { messages } = await this.SupportRequestModel.findById(
      supportRequest,
    ).populate({
      path: 'messages',
      populate: {
        path: 'author',
        select: 'id, name',
      },
      select: '-__v',
    });

    return messages;
  }

  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    const subscription = this.SupportRequestModel.watch().on(
      'change',
      async (change) => {
        if (change.operationType === 'insert') {
          const newMessageId =
            change.fullDocument.messages[
              change.fullDocument.messages.length - 1
            ];
          const newMessage = await this.MessageModel.findById(newMessageId);
          handler(change.fullDocument, newMessage);
        }
      },
    );

    return () => subscription.close();
  }
}
