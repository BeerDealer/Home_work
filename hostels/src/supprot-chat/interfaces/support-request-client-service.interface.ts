import { ID } from 'src/types/id.type';
import { SupportRequest } from '../schemas/support-request.schema';
import { IMarkMessagesAsReadDto } from './dto/mark-message-as-read.dto';
import { ICreateSupportRequestDto } from './dto/create-support-request.dto';

export interface ISupportRequestClientService {
  createSupportRequest(data: ICreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: IMarkMessagesAsReadDto): Promise<void>;
  getUnreadCount(supportRequest: ID): Promise<number>;
}
