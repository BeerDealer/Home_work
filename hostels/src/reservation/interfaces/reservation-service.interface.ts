import { ID } from 'src/types/id.type';
import { Reservation } from '../schemas/reservation.schema';
import { IReservationDto } from './dto/reservation.dto';
import { IReservationSearchOptions } from './reservation-search-options.interface';

export interface IReservationService {
  addReservation(data: IReservationDto): Promise<Reservation>;
  removeReservation(id: ID): Promise<void>;
  getReservations(filter: IReservationSearchOptions): Promise<Reservation[]>;
}
