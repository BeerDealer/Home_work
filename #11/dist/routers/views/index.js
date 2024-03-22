"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_create_1 = __importDefault(require("./book_create"));
const book_delete_1 = __importDefault(require("./book_delete"));
const book_list_1 = __importDefault(require("./book_list"));
const book_update_1 = __importDefault(require("./book_update"));
const book_view_1 = __importDefault(require("./book_view"));
const routers = [
    book_create_1.default,
    book_delete_1.default,
    book_list_1.default,
    book_update_1.default,
    book_view_1.default,
];
exports.default = routers;
