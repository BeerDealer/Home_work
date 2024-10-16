import {
  Body,
  Controller,
  Get,
  // HttpException,
  // HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppDataValidationPipe } from './app.data.validation.pipe';
import { IBodyCreateDto } from './interfaces/dto/body-create.dto';
import { ICatCreateDto } from './interfaces/dto/cat-create.dto';
import { CatValidationPipe } from './validation/cat.validation.pipe';
import { catValidationSchema } from './validation/schemas/cat.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    // throw new HttpException('Bad', HttpStatus.BAD_REQUEST);
    return this.appService.getHello();
  }

  @Post()
  public createUser(@Body(AppDataValidationPipe) body: IBodyCreateDto) {
    return body;
  }

  @Post('cat')
  @UsePipes(new CatValidationPipe(catValidationSchema))
  public createCat(@Body() body: ICatCreateDto) {
    return body;
  }
}
