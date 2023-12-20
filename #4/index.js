const express = require("express");
const Book = require("./book.js");

const storage = {
  bookshelf: [],
};

const app = express();
app.use(express.json());

app.post("/api/user/login", (_, response) => {
  response.status(201);
  response.json({ id: 1, mail: "test@mail.ru" });
});

app.get("/api/books", (_, response) => {
  const books = storage.bookshelf;
  response.json(books);
});

app.get("/api/books/:id", (query, response) => {
  const { id } = query.params;
  const { bookshelf } = storage;
  const bookId = bookshelf.findIndex((_book) => _book.id === id);

  if (bookId !== -1) {
    response.json(bookshelf[bookId]);
  } else {
    response.status(404);
    response.json("Book not found");
  }
});

app.post("/api/books", (query, response) => {
  const { bookshelf } = storage;

  const newBook = new Book({});
  bookshelf.push(newBook);

  response.status(201);
  response.json(newBook);
});

app.put("/api/books/:id", (query, response) => {
  const { bookshelf } = storage;
  const { id } = query.params;
  const newData = query.body;
  const bookId = bookshelf.findIndex((_book) => _book.id === id);

  if (bookId !== -1) {
    try {
      bookshelf[bookId].update(newData);
      response.status(201);
      response.json(bookshelf[bookId]);
    } catch (error) {
      response.status(404);
      response.json(error.message);
    }
  } else {
    response.status(404);
    response.json("Book not found");
  }
});

app.delete("/api/books/:id", (query, response) => {
  const { bookshelf } = storage;
  const { id } = query.params;
  const bookId = bookshelf.findIndex((book) => book.id === id);

  if (bookId !== -1) {
    bookshelf.splice(bookId, 1);
    response.status(201);
    response.json("Ok");
  } else {
    response.status(404);
    response.json("Book not found");
  }
});

let port = process.env.PORT || 3000;
app.listen(port);
