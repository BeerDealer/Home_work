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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = __importDefault(require("./routers/api"));
const views_1 = __importDefault(require("./routers/views"));
const middlewares_1 = __importDefault(require("./middlewares"));
const PORT = parseInt(process.env.PORT) || 3000;
const URL_DB = process.env.URL_DB;
const start = (port, url, app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(url, {
            dbName: "books",
        });
        app.listen(port, () => {
            console.log(`App starts on ${port}`);
        });
    }
    catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
});
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.set("view engine", "ejs");
console.log(typeof api_1.default);
api_1.default.forEach((router) => {
    app.use("/api", router);
});
views_1.default.forEach((router) => {
    app.use("/", router);
});
middlewares_1.default.forEach((middleware) => {
    console.log(middleware);
    app.use(middleware);
});
start(PORT, URL_DB, app);
