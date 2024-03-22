import { Request, Response, Router } from "express";
import { BookService } from "../../services/book_service";
import { container } from "../../infrastructure/container";
import { Book } from "../../interfaces/book";

const router = Router();

router.get("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const service: BookService = container.get(BookService);
  try {
    const book: Book | null = await service.getBook(id);

    if (!book) {
      throw new Error(`Книга с ID ${id} не найдена`);
    }

    res.render("books/view", {
      title: `Книга: ${book.title}`,
      book,
    });
  } catch (error) {
    console.error("Ошибка при обработке запроса:", error);
    res.redirect("/404");
  }
});

export default router;
