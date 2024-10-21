import { ID } from 'src/types/id.type';
import { IGetChatListParams } from './get-chat-list-params.interface';
import { Message } from '../schemas/message.schema';
import { ISendMessageDto } from './dto/send-message.dto';
import { SupportRequest } from '../schemas/support-request.schema';

export interface ISupportRequestService {
  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: ISendMessageDto): Promise<Message>;
  getMessages(supportRequest: ID): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}
