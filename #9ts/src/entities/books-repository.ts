import { Book } from "../interfaces/book";

class BooksRepository {
  createBook(book: Book): void {}
  getBook(id: string) {
  }
  getBooks(): Array<Book> {
    return [];
  }
  updateBook(id: string): void {}
  deleteBook(id: string): void {}
}
