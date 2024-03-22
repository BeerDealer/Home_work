import { Router } from "express";
import addBook from "./add_book";
import books from "./books";
import deleteBook from "./delete_book";
import getBook from "./get_book";
import updateBook from "./update_book";

const routers: Array<Router> = [
  addBook,
  books,
  deleteBook,
  getBook,
  updateBook,
];

export default routers;
