import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ICreateHotelDto } from '../interfaces/dto/hotel-create.dto';
import { HotelService } from 'src/hotel/hotel.service';
import { CreateHotelValidationPipe } from '../validation/create-hotel.validation.pipe';
import { CreateHotelValidationSchema } from '../validation/schemas/create-hotel.schema';

@Controller('admin')
export class AdminController {
  constructor(private readonly hotelService: HotelService) {}

  @Post('hotels')
  @UsePipes(new CreateHotelValidationPipe(CreateHotelValidationSchema))
  public createHotel(@Body() body: ICreateHotelDto) {
    return this.hotelService.create(body);
  }
}
