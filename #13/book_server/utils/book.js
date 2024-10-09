const { v4: uuid } = require("uuid");

class Book {
  constructor({
    title = "",
    description = "",
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = "",
    fileBook = ""
  }) {
    Object.defineProperty(this, "id", {
      value: uuid(),
      writable: false,
      enumerable: true,
      configurable: false,
    });
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;

    Object.preventExtensions(this);
  }

  update(data) {
    try {
      Object.assign(this, data);
    } catch (_) {
      throw new Error("Error: Attempt to update non-existent fields");
    }
  }
}

module.exports = Book;
