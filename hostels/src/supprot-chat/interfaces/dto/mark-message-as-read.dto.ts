import { ID } from 'src/types/id.type';

export interface IMarkMessagesAsReadDto {
  user: ID;
  supportRequest: ID;
  createdBefore: Date;
}
