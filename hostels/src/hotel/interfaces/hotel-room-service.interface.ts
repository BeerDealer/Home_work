import { ID } from 'src/types/id.type';
import { HotelRoom } from '../schemas/hotel-room.schema';
import { ISearchRoomsParams } from './search-rooms-params.interface';

export interface IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ID): Promise<HotelRoom>;
  search(params: ISearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
