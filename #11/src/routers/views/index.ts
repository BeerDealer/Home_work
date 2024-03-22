import { Router } from "express";
import bookCreate from "./book_create";
import bookDelete from "./book_delete";
import bookList from "./book_list";
import bookUpdate from "./book_update";
import bookView from "./book_view";

const routers: Array<Router> = [
  bookCreate,
  bookDelete,
  bookList,
  bookUpdate,
  bookView,
];

export default routers;
