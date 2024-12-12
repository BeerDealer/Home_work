import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IHotelRoomService } from './interfaces/hotel-room-service.interface';
import { ID } from 'src/types/id.type';
import { ISearchRoomsParams } from './interfaces/search-rooms-params.interface';
import { HotelRoom, HotelRoomDocument } from './schemas/hotel-room.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { ICreateHotelRoomDto } from 'src/api/api-hotel/interfaces/dto/hotel-room-create.dto';
import { IUpdateHotelRoomDto } from 'src/api/api-hotel/interfaces/dto/update-hotel-room.tdo';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly HotelRoomModel: Model<HotelRoomDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public async create(data: ICreateHotelRoomDto): Promise<HotelRoom> {
    const hotelRoom = new this.HotelRoomModel({ ...data, isEnabled: true });
    const { _id } = await hotelRoom.save();
    return (
      await this.HotelRoomModel.findById(_id).populate('hotel')
    ).toObject();
  }

  public async findById(id: ID): Promise<HotelRoom> {
    const hotelRoom = await this.HotelRoomModel.findById(id);
    if (!hotelRoom) {
      throw new HttpException('Номер не найден', HttpStatus.BAD_REQUEST);
    }
    return hotelRoom;
  }

  public async search(params: ISearchRoomsParams): Promise<HotelRoom[]> {
    const query: any = {};
    if (params.hotel) {
      query.hotel = params.hotel;
    }
    if (params.isEnabled) {
      query.isEnabled = params.isEnabled;
    }
    const hotelRooms = await this.HotelRoomModel.find(query)
      .skip(params.offset)
      .limit(params.limit);
    return hotelRooms;
  }

  public async update(id: ID, data: IUpdateHotelRoomDto): Promise<HotelRoom> {
    return (
      await this.HotelRoomModel.findByIdAndUpdate(id, data, {
        new: true,
      }).populate('hotel')
    ).toObject();
  }
}
