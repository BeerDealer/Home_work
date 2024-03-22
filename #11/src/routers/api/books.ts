import { Request, Response, Router } from "express";
import { container } from "../../infrastructure/container";
import { BookService } from "../../services/book_service";

const router = Router();

router.get("/books", async (_: Request, res: Response) => {
  const service: BookService = container.get(BookService);
  try {
    const books = await service.getAllBooks();
    res.json(books);
    res.status(200);
  } catch (err) {
    res.status(404);
    res.json(err);
  }
});

export default router;
