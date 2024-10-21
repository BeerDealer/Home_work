import { ID } from 'src/types/id.type';
import { IMarkMessagesAsReadDto } from './dto/mark-message-as-read.dto';

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: IMarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<number>;
  closeRequest(supportRequest: ID): Promise<void>;
}
