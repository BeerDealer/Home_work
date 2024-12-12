import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ICreateHotelDto } from '../interfaces/dto/hotel-create.dto';
import { HotelService } from 'src/hotel/hotel.service';
import { HotelValidationPipe } from '../validation/hotel-validation.pipe';
import { UpdateHotelValidationSchema } from '../validation/schemas/update-hotel.schema';
import { SessionGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { UserRole } from 'src/user/enums/role.enum';
import { ISearchHotelParams } from 'src/hotel/interfaces/search-params.interface';
import { ID } from 'src/types/id.type';
import { Hotel } from 'src/hotel/schemas/hotel.schema';
import { IUpdateHotelParams } from 'src/hotel/interfaces/update-hotel-params.interface';
import { CreateHotelValidationSchema } from '../validation/schemas/create-hotel.schema';
import { ICreateHotelRoomDto } from '../interfaces/dto/hotel-room-create.dto';
import { HotelRoomService } from 'src/hotel/hotel-room.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storageConfig } from '../configs/sotrage';
import { IUpdateHotelRoomDto } from '../interfaces/dto/update-hotel-room.tdo';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  @Post('hotels')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @UsePipes(new HotelValidationPipe(CreateHotelValidationSchema))
  public createHotel(@Body() body: ICreateHotelDto): Promise<Hotel> {
    return this.hotelService.create(body);
  }

  @Get('hotels')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  public findAll(@Query() query: ISearchHotelParams): Promise<Hotel[]> {
    return this.hotelService.search(query);
  }

  @Put('hotels/:id')
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  public async updateHotel(
    @Body(new HotelValidationPipe(UpdateHotelValidationSchema))
    body: IUpdateHotelParams,
    @Param('id') id: ID,
  ): Promise<Hotel> {
    return await this.hotelService.update(id, body);
  }

  @Post('hotel-rooms')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: storageConfig,
    }),
  )
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  public async createHotelRoom(
    @Body() body: ICreateHotelRoomDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /^image\// })],
        fileIsRequired: false,
      }),
    )
    multerImagesArray: Express.Multer.File[],
  ) {
    await this.hotelService.findById(body.hotel);
    const images = multerImagesArray.map((file) => file.path);
    body.images = images;
    const hotelRoom = await this.hotelRoomService.create(body);
    return hotelRoom;
  }

  @Put('hotel-rooms/:id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: storageConfig,
    }),
  )
  @UseGuards(SessionGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  async updateHotelRoom(
    @Body() body: IUpdateHotelRoomDto,
    @Param('id') id: ID,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /^image\// })],
        fileIsRequired: false,
      }),
    )
    multerImagesArray: Express.Multer.File[],
  ) {
    await this.hotelService.findById(body.hotel);
    const hotelRoom = await this.hotelRoomService.findById(id);
    const images = multerImagesArray.map((file) => file.path);

    body.images = [...hotelRoom.images, ...images];
    return await this.hotelRoomService.update(id, body);
  }
}
