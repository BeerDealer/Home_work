import { Injectable, Scope } from '@nestjs/common';
import { IBook } from './interfaces/book.interface';

@Injectable({ scope: Scope.DEFAULT })
export class BookService {
  private readonly books: Array<IBook> = [];
  saveOne(book: IBook): void {
    this.books.push(book);
  }
  findAll(): Array<IBook> {
    return this.books;
  }
}
