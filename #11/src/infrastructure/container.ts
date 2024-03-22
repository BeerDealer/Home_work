import { Container } from "inversify";
import "reflect-metadata";
import { BookService } from "../services/book_service";

export const container = new Container();

container.bind(BookService).toSelf();
