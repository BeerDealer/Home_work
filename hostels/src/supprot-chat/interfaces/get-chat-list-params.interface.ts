import { ID } from 'src/types/id.type';

export interface IGetChatListParams {
  userId?: ID | null;
  isActive?: boolean;
  limit?: number;
  offset?: number;
}
