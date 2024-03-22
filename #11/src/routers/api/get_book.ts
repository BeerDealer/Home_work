import { Request, Response, Router } from "express";
import { container } from "../../infrastructure/container";
import { BookService } from "../../services/book_service";

const router = Router();

router.get("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const service: BookService = container.get(BookService);
  try {
    const book = await service.getBook(id);
    res.json(book);
    res.status(200);
  } catch (err) {
    res.status(404);
    res.json(err);
  }
});

export default router;
