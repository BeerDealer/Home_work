"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "public");
    },
    filename(query, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        query.body.fileName = fileName;
        cb(null, fileName);
    },
});
exports.default = storage;
