import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IHotelService } from './interfaces/hotel-service.interface';
import { ID } from 'src/types/id.type';
import { ISearchHotelParams } from './interfaces/search-params.interface';
import { IUpdateHotelParams } from './interfaces/update-hotel-params.interface';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private readonly HotelModel: Model<HotelDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public async create(data: Partial<Hotel>): Promise<Hotel> {
    try {
      const hotel = new this.HotelModel(data);
      return (await hotel.save()).toObject();
    } catch (err) {
      throw new HttpException('Отель уже существует', HttpStatus.BAD_REQUEST);
    }
  }

  public async findById(id: ID): Promise<Hotel> {
    const hotel = await this.HotelModel.findById(id);
    return hotel;
  }

  public async search(params: ISearchHotelParams): Promise<Hotel[]> {
    const query: any = {};
    if (params.title) {
      query.title = params.title;
    }
    const hotels = await this.HotelModel.find(query)
      .select('-_id -__v -createdAt -updatedAt')
      .skip(params.offset)
      .limit(params.limit);
    return hotels;
  }

  public async update(id: ID, data: IUpdateHotelParams): Promise<Hotel> {
    const hotel = await this.HotelModel.findByIdAndUpdate(id, data, {
      new: true,
    }).select('-__v -createdAt -updatedAt');
    return hotel;
  }
}
