import { ID } from 'src/types/id.type';
import { HotelRoom } from '../schemas/hotel-room.schema';
import { ISearchRoomsParams } from './search-rooms-params.interface';
import { ICreateHotelRoomDto } from 'src/api/api-hotel/interfaces/dto/hotel-room-create.dto';

export interface IHotelRoomService {
  create(data: ICreateHotelRoomDto): Promise<HotelRoom>;
  findById(id: ID): Promise<HotelRoom>;
  search(params: ISearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
