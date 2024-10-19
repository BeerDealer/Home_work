import { Injectable } from '@nestjs/common';
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

  public async addReservation(data: IReservationDto): Promise<Reservation> {
    const existReservation = await this.ReservationModel.find({
      hotelId: data.hotelId,
      roomId: data.roomId,
      $or: [
        { dateStart: { $gte: data.dateEnd } },
        { dateEnd: { $lte: data.dateStart } },
      ],
    });
    if (existReservation) {
      const reservation = new this.ReservationModel(data);
      return await reservation.save();
    }
    return existReservation[0];
  }
  public async removeReservation(id: ID): Promise<void> {
    this.ReservationModel.findByIdAndDelete(id);
  }

  getReservations(filter: IReservationSearchOptions): Promise<Reservation[]> {
    throw new Error('Method not implemented.');
  }
}
