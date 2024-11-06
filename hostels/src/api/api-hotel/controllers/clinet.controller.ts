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

@Controller('client')
export class ClientController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly hotelRoomService: HotelRoomService,
    private readonly hotelService: HotelService,
    private readonly userService: UserService,
  ) {}

  @Post('reservations')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.CLIENT)
  async createReservation(
    @Body() body: ICreateReservationDto,
    @UsersEmail() email: string,
  ): Promise<Reservation> {
    const user = await this.userService.findByEmail(email);
    const room = await this.hotelRoomService.findById(body.hotelRoom);

    if (!room) {
      throw new HttpException('Такой номер не найден', HttpStatus.BAD_REQUEST);
    }
    if (!room.isEnabled) {
      throw new HttpException('Номер недоступен', HttpStatus.BAD_REQUEST);
    }
    const hotel = await this.hotelService.findById(room.hotel);
    const data = {
      userId: user._id,
      hotelId: hotel._id,
      roomId: room._id,
      dateStart: new Date(body.startDate),
      dateEnd: new Date(body.endDate),
    };

    return await this.reservationService.addReservation(data);
  }

  @Get('reservations')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.CLIENT)
  async findAllReservations(
    @UsersEmail() email: string,
    @Query('dateStart') dateStart?: string,
    @Query('dateEnd') dateEnd?: string,
  ): Promise<Reservation[]> {
    const user = await this.userService.findByEmail(email);

    return await this.reservationService.getReservations({
      userId: user._id,
      dateEnd: dateEnd ? new Date(dateEnd) : null,
      dateStart: dateStart ? new Date(dateStart) : null,
    });
  }

  @Delete('reservations/:id')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.CLIENT)
  async deleteReservation(
    @Param('id') id: string,
    @UsersEmail() email: string,
  ): Promise<void> {
    const { _id: userId } = await this.userService.findByEmail(email);
    const { userId: reservationUserId } =
      (await this.reservationService.getReservationById(id)) || {};
    if (reservationUserId === undefined)
      throw new HttpException('Бронь не существует', HttpStatus.BAD_REQUEST);
    if (userId.toString() !== reservationUserId.toString())
      throw new HttpException(
        'Нельзя отменить бронь другого пользователя',
        HttpStatus.FORBIDDEN,
      );
    await this.reservationService.removeReservation(id);
  }
}
