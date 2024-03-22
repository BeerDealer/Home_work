import { Request, Response, Router } from "express";
import { BookService } from "../../services/book_service";
import { container } from "../../infrastructure/container";
import { Book } from "../../interfaces/book";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const service: BookService = container.get(BookService);
  const books: Array<Book> = await service.getAllBooks();

  res.render("books/index", {
    title: "Книги",
    books: books,
  });
});

export default router;
