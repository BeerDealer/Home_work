import { Request, Response, Router } from "express";
import { BookService } from "../../services/book_service";
import { container } from "../../infrastructure/container";
import { Book } from "../../interfaces/book";

const router = Router();

router.get("/update/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const service: BookService = container.get(BookService);
  try {
    const book: Book | null = await service.getBook(id);
    if (!book) {
      throw new Error(`Книга с ID ${id} не найдена`);
    }
    res.render("books/update", {
      title: `Создать книгу`,
      book: book,
    });
  } catch (err) {
    res.redirect("/404");
  }
});

router.post("/update/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const service: BookService = container.get(BookService);
  await service.updateBook(id, data);
  res.redirect("/");
});

export default router;
