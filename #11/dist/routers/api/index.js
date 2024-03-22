"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const add_book_1 = __importDefault(require("./add_book"));
const books_1 = __importDefault(require("./books"));
const delete_book_1 = __importDefault(require("./delete_book"));
const get_book_1 = __importDefault(require("./get_book"));
const update_book_1 = __importDefault(require("./update_book"));
const routers = [
    add_book_1.default,
    books_1.default,
    delete_book_1.default,
    get_book_1.default,
    update_book_1.default,
];
exports.default = routers;
