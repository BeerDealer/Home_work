"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_service_1 = require("../../services/book_service");
const container_1 = require("../../infrastructure/container");
const router = (0, express_1.Router)();
router.get("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const service = container_1.container.get(book_service_1.BookService);
    try {
        const book = yield service.getBook(id);
        if (!book) {
            throw new Error(`Книга с ID ${id} не найдена`);
        }
        res.render("books/view", {
            title: `Книга: ${book.title}`,
            book,
        });
    }
    catch (error) {
        console.error("Ошибка при обработке запроса:", error);
        res.redirect("/404");
    }
}));
exports.default = router;
