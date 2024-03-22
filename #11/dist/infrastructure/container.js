"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const book_service_1 = require("../services/book_service");
exports.container = new inversify_1.Container();
exports.container.bind(book_service_1.BookService).toSelf();
