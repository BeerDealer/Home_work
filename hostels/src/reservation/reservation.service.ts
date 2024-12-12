import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReservationService } from './interfaces/reservation-service.interface';
import { ID } from 'src/types/id.type';
import { IReservationDto } from './interfaces/dto/reservation.dto';
import { IReservationSearchOptions } from './interfaces/reservation-search-options.interface';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class ReservationService implements IReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly ReservationModel: Model<ReservationDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public async getReservationById(id: ID): Promise<Reservation> {
    const reservation = await this.ReservationModel.findById(id);
    if (!reservation)
      throw new HttpException('Бронь не существует', HttpStatus.BAD_REQUEST);
    return reservation;
  }

  public async addReservation(data: IReservationDto): Promise<Reservation> {
    const existReservation = await this.ReservationModel.find({
      hotelId: data.hotelId,
      roomId: data.roomId,
      $or: [
        { dateStart: { $lt: data.dateEnd, $gte: data.dateStart } },
        { dateEnd: { $gt: data.dateStart, $lte: data.dateEnd } },
      ],
    });
    console.log(existReservation);
    if (existReservation.length === 0) {
      const reservation = new this.ReservationModel(data);
      const savedReservation = await reservation.save();
      return (
        await this.ReservationModel.findById(savedReservation._id)
          .select('-__v -_id')
          .populate([
            {
              path: 'hotelId',
              select: 'title description -_id',
              model: 'Hotel',
            },
            {
              path: 'roomId',
              select: 'description images -_id',
              model: 'HotelRoom',
            },
          ])
      ).toObject();
    }
    throw new HttpException('Бронь недоступна', HttpStatus.BAD_REQUEST);
  }

  public async removeReservation(id: ID): Promise<void> {
    await this.ReservationModel.findByIdAndDelete(id);
  }

  public async getReservations(
    filter: IReservationSearchOptions,
  ): Promise<Reservation[]> {
    const query: any = { userId: filter.userId };
    if (filter.dateEnd) query.dateEnd = filter.dateEnd;
    if (filter.dateStart) query.dateStart = filter.dateStart;
    console.log(query);
    const reservations = await this.ReservationModel.find(query)
      .select('-__v -_id')
      .populate([
        {
          path: 'hotelId',
          select: 'title description -_id',
          model: 'Hotel',
        },
        {
          path: 'roomId',
          select: 'description images -_id',
          model: 'HotelRoom',
        },
      ]);
    if (reservations)
      return reservations.map((reservation) => reservation.toObject());
    return [];
  }
}
