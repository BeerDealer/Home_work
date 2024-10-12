import { Injectable } from '@nestjs/common';
import { ICreateBokDto } from './interfaces/dto/create-book.interface';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './scemas/book.schema';
import { Connection, Model } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { IUpdateBookDto } from './interfaces/dto/update-book.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public createOne(data: ICreateBokDto): Promise<BookDocument> {
    const book = new this.BookModel(data);

    return book.save();
  }

  public findOne(id: string): Promise<BookDocument> {
    return this.BookModel.findOne({ _id: id });
  }

  public findAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  public updateOne(id: string, data: IUpdateBookDto): Promise<BookDocument> {
    return this.BookModel.findOneAndUpdate({ _id: id }, data);
  }

  public deleteOne(id: string): Promise<DeleteResult> {
    return this.BookModel.deleteOne({ _id: id });
  }
}
