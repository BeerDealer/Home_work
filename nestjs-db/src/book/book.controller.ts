import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ICreateBokDto } from './interfaces/dto/create-book.interface';
import { BookDocument } from './scemas/book.schema';
import { IParamId } from './interfaces/param-id.interface';
import { IUpdateBookDto } from './interfaces/dto/update-book.interface';
import { DeleteResult } from 'mongodb';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  public findAll(): Promise<BookDocument[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  public findOne(@Param() { id }: IParamId): Promise<BookDocument> {
    return this.bookService.findOne(id);
  }

  @Post()
  public createOne(@Body() body: ICreateBokDto): Promise<BookDocument> {
    return this.bookService.createOne(body);
  }

  @Put(':id')
  public updateOne(
    @Param() { id }: IParamId,
    @Body() body: IUpdateBookDto,
  ): Promise<BookDocument> {
    return this.bookService.updateOne(id, body);
  }

  @Delete(':id')
  public deleteOne(@Param() { id }: IParamId): Promise<DeleteResult> {
    return this.bookService.deleteOne(id);
  }
}
