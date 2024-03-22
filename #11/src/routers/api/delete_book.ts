import { Request, Response, Router } from "express";
import { BookService } from "../../services/book_service";
import { container } from "../../infrastructure/container";

const router = Router();

router.delete("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const service: BookService = container.get(BookService);
  try {
    await service.deleteBook(id);
    res.json("Ok");
    res.status(201);
  } catch (err) {
    res.status(404);
    res.json(err);
  }
});

export default router;
