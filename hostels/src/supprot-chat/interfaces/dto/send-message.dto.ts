import { ID } from 'src/types/id.type';

export interface ISendMessageDto {
  author: ID;
  supportRequest: ID;
  text: string;
}
