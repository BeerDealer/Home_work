import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { IBookData } from './interfaces/book-data.interface';
import { Book } from './models/book.model';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  retrieveAll() {
    return this.bookService.findAll();
  }

  @Post()
  createOne(@Body() bookData: IBookData) {
    try {
      const someBook = new Book(bookData);
      this.bookService.saveOne(someBook);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Book saved successfully',
        book: someBook,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error saving book',
      };
    }
  }
}
