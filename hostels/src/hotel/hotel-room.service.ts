import { Injectable } from '@nestjs/common';
import { IHotelRoomService } from './interfaces/hotel-room-service.interface';
import { ID } from 'src/types/id.type';
import { ISearchRoomsParams } from './interfaces/search-rooms-params.interface';
import { HotelRoom, HotelRoomDocument } from './schemas/hotel-room.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly HotelRoomModel: Model<HotelRoomDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const hotelRoom = new this.HotelRoomModel(data);
    return await hotelRoom.save();
  }

  public async findById(id: ID): Promise<HotelRoom> {
    const hotelRoom = await this.HotelRoomModel.findById(id);
    return hotelRoom;
  }

  public async search(params: ISearchRoomsParams): Promise<HotelRoom[]> {
    const query: Record<string, any> = { hotel: params.hotel };
    if (params.isEnabled !== undefined) {
      query.isEnabled = params.isEnabled;
    }
    const hotelRooms = await this.HotelRoomModel.find(query)
      .skip(params.offset)
      .limit(params.limit);
    return hotelRooms;
  }

  public async update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
    const hotelRoom = await this.HotelRoomModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return hotelRoom;
  }
}
