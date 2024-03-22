import { injectable } from "inversify";
import { Book } from "../interfaces/book";
import { BookModel } from "../models/book";

interface BookDTO {
  title: Book["title"];
  description: Book["description"];
  authors: Book["authors"];
  favorite: Book["favorite"];
  fileCover: Book["fileCover"];
  fileName: Book["fileName"];
}

@injectable()
export class BookService {
  public async createBook(data: BookDTO): Promise<Book> {
    const book = new BookModel(data);
    await book.save();
    return book;
  }

  public async getBook(id: string): Promise<Book | null> {
    return await BookModel.findById(id);
  }

  public async updateBook(id: string, data: BookDTO): Promise<void> {
    await BookModel.findOneAndUpdate({ _id: id }, data);
  }

  public async deleteBook(id: string): Promise<void> {
    await BookModel.deleteOne({ _id: id });
  }

  public async getAllBooks(): Promise<Array<Book>> {
    return await BookModel.find();
  }
}
