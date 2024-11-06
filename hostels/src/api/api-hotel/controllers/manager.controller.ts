import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from 'src/user/enums/role.enum';
import { ICreateReservationDto } from '../interfaces/dto/create-reservation.dto';
import { Role } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { SessionGuard } from 'src/auth/auth.guard';
import { ReservationService } from 'src/reservation/reservation.service';
import { Reservation } from 'src/reservation/schemas/reservation.schema';
import { HotelRoomService } from 'src/hotel/hotel-room.service';
import { UserService } from 'src/user/user.service';
import { UsersEmail } from 'src/api/decorators/users-email.decorator';
import { HotelService } from 'src/hotel/hotel.service';
import { Types } from 'mongoose';

@Controller('manager')
export class ManagerController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly hotelRoomService: HotelRoomService,
    private readonly hotelService: HotelService,
    private readonly userService: UserService,
  ) {}

  @Get('reservations/:userId')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.MANAGER)
  async findAllReservations(
    @Param('userId') id: string,
  ): Promise<Reservation[]> {
    console.log(id);
    return await this.reservationService.getReservations({
      userId: new Types.ObjectId(id),
    });
  }

  @Delete('reservations/:id')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.MANAGER)
  async deleteReservation(@Param('id') id: string): Promise<void> {
    const { userId: reservationUserId } =
      (await this.reservationService.getReservationById(id)) || {};
    if (reservationUserId === undefined)
      throw new HttpException('Бронь не существует', HttpStatus.BAD_REQUEST);

    await this.reservationService.removeReservation(id);
  }
}
