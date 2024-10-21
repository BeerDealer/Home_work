import { ID } from 'src/types/id.type';

export interface ICreateSupportRequestDto {
  user: ID;
  text: string;
}
