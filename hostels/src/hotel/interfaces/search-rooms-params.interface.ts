import { ID } from 'src/types/id.type';

export interface ISearchRoomsParams {
  limit: number;
  offset: number;
  hotel: ID;
  isEnabled?: boolean;
}
