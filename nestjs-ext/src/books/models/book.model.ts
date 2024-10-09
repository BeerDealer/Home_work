import { IBookData } from '../interfaces/book-data.interface';
import { IBook } from '../interfaces/book.interface';

export class Book implements IBook {
  author: string;
  title: string;
  pages: number;

  constructor(bookData: IBookData) {
    this.author = bookData.author;
    this.title = bookData.title;
    this.pages = bookData.pages;
  }
}
