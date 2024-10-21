import { Injectable } from '@nestjs/common';
import { ISupportRequestEmployeeService } from './interfaces/support-request-employee-service.interface';
import { ID } from 'src/types/id.type';
import { IMarkMessagesAsReadDto } from './interfaces/dto/mark-message-as-read.dto';

@Injectable()
export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  markMessagesAsRead(params: IMarkMessagesAsReadDto) {
    throw new Error('Method not implemented.');
  }
  getUnreadCount(supportRequest: ID): Promise<number> {
    throw new Error('Method not implemented.');
  }
  closeRequest(supportRequest: ID): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
