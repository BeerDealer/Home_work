import { Request, Response, Router } from "express";
import { BookService } from "../../services/book_service";
import { container } from "../../infrastructure/container";
const router = Router();

router.get("/create", (req: Request, res: Response) => {
  res.render("books/create", {
    title: `Создать книгу`,
    book: {},
  });
});

router.post("/create", async (req: Request, res: Response) => {
  const data = req.body;
  const service: BookService = container.get(BookService);
  await service.createBook(data);
  res.redirect("/");
});

export default router;
