import { Request, Response, Router } from "express";
import { BookService } from "../../services/book_service";
import fileUploader from "../../middlewares/file";
import { container } from "../../infrastructure/container";

const router = Router();

router.put("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const service: BookService = container.get(BookService);
  try {
    await service.updateBook(id, data);
    res.redirect(`/api/books/${id}`);
  } catch (err) {
    res.status(405);
    res.json(err);
  }
});

export default router;
