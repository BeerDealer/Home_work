import { Request, Response, Router } from "express";
import { BookService } from "../../services/book_service";
import { container } from "../../infrastructure/container";

const router = Router();

router.post("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const service: BookService = container.get(BookService);
  try {
    await service.deleteBook(id);
    res.redirect("/");
  } catch (err) {
    res.redirect("/404");
  }
});

export default router;
