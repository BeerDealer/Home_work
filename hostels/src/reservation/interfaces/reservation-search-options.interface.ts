import { ID } from 'src/types/id.type';

export interface IReservationSearchOptions {
  userId: ID;
  dateStart: Date;
  dateEnd: Date;
}
