import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserLogged } from 'src/api/decorators/user-logged.decorator';
import { HotelRoomService } from 'src/hotel/hotel-room.service';
import { HotelService } from 'src/hotel/hotel.service';
import { ISearchHotelParams } from 'src/hotel/interfaces/search-params.interface';
import { ISearchRoomsParams } from 'src/hotel/interfaces/search-rooms-params.interface';
import { UserRole } from 'src/user/enums/role.enum';

@Controller('common')
export class CommonController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  @Get('hotel-rooms')
  public getHotelRooms(
    @Query() query: ISearchRoomsParams,
    @UserLogged() role: UserRole,
  ) {
    if (role === UserRole.CLIENT) {
      query.isEnabled = true;
    }
    console.log(query);
    return this.hotelRoomService.search(query);
  }

  @Get('hotel-rooms/:id')
  public getHotelRoom(@Param('id') id: string) {
    return this.hotelRoomService.findById(id);
  }
}
