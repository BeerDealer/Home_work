const fs = require("fs");

class Storage {
  constructor() {
    this.path = "./misc/storage.json";
    this.storageError = new Error("storage error");
  }

  getData() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      const bookData = JSON.parse(data);
      return bookData;
    } catch (err) {
      throw this.storageError;
    }
  }

  getDataById(id) {
    try {
      const { bookshelf } = this.getData();
      const bookId = bookshelf.findIndex((_book) => _book.id === id);

      if (bookId !== -1) {
        return bookshelf[bookId];
      } else {
        throw new Error("Book bot found");
      }
    } catch (err) {
      throw this.storageError;
    }
  }

  writeData(data) {
    try {
      const currentData = this.getData();
      currentData.bookshelf.push(data);
      const jsonData = JSON.stringify(currentData);
      fs.writeFileSync(this.path, jsonData, "utf-8");
    } catch (err) {
      throw this.storageError;
    }
  }

  deleteDataById(id) {
    const currentData = this.getData();
    const bookId = currentData.bookshelf.findIndex((book) => book.id === id);

    if (bookId !== -1) {
      currentData.bookshelf.splice(bookId, 1);
      const jsonData = JSON.stringify(currentData);
      fs.writeFileSync(this.path, jsonData, "utf-8");
    } else {
      throw this.storageError;
    }
  }

  updateBookData(id, data) {
    const books = this.getData();
    const bookId = books.bookshelf.findIndex((book) => book.id === id);
    if (bookId !== -1) {
      books.bookshelf[bookId] = { ...books.bookshelf[bookId], ...data };
      const jsonData = JSON.stringify(books);
      fs.writeFileSync(this.path, jsonData, "utf-8");
    } else {
      throw this.storageError;
    }
  }

  getBookfile(id) {
    try {
      const { bookshelf } = this.getData();
      const bookId = bookshelf.findIndex((_book) => _book.id === id);

      if (bookId !== -1) {
        return bookshelf[bookId].fileName;
      } else {
        throw new Error("Book bot found");
      }
    } catch (err) {
      throw this.storageError;
    }
  }
}

module.exports = Storage;
