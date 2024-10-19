import { ID } from 'src/types/id.type';
import { IUpdateHotelParams } from './update-hotel-params.interface';
import { ISearchHotelParams } from './search-params.interface';
import { Hotel } from '../schemas/hotel.schema';

export interface IHotelService {
  create(data: Partial<Hotel>): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: ISearchHotelParams): Promise<Hotel[]>;
  update(id: ID, data: IUpdateHotelParams): Promise<Hotel>;
}
