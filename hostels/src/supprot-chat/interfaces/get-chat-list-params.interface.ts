import { ID } from 'src/types/id.type';

export interface IGetChatListParams {
  user: ID | null;
  isActive: boolean;
}
