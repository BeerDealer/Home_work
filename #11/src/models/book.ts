import { Document, Schema, model } from "mongoose";
import { Book } from "../interfaces/book";

const schema = new Schema({
  title: String,
  description: String,
  authors: [String],
  favorite: String,
  fileCover: String,
  fileName: String,
});

export const BookModel = model<Book & Document>("Book", schema);
