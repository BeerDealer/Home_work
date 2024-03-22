"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: String,
    description: String,
    authors: [String],
    favorite: String,
    fileCover: String,
    fileName: String,
});
exports.BookModel = (0, mongoose_1.model)("Book", schema);
