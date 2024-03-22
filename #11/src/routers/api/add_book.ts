import { Request, Response, Router } from "express";
import { container } from "../../infrastructure/container";
import { BookService } from "../../services/book_service";

const router = Router();

router.post("/books", async (req: Request, res: Response) => {
  const data = req.body;
  const service: BookService = container.get(BookService);
  try {
    const book = service.createBook(data);
    res.json(book);
    res.status(201);
  } catch (err) {
    res.json(err);
    res.status(401);
  }
});

export default router;
