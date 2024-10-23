import { Controller, Get, Param, Query } from '@nestjs/common';
import { HotelRoomService } from 'src/hotel/hotel-room.service';
import { ISearchHotelParams } from 'src/hotel/interfaces/search-params.interface';
import { ISearchRoomsParams } from 'src/hotel/interfaces/search-rooms-params.interface';

@Controller('common')
export class CommonController {
  constructor(
    private readonly hotelService: HotelRoomService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  @Get('hotel-rooms')
  public getHotelRooms(@Query() query: ISearchRoomsParams) {
    return this.hotelRoomService.search(query);
  }

  @Get('hotel-rooms/:id')
  public getHotelRoom(@Param('id') id: string) {
    return this.hotelRoomService.findById(id);
  }
}
