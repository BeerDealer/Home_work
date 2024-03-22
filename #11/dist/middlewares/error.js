"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
function error(req, res) {
    res.render("errors/404", {
        title: "404",
    });
}
exports.error = error;
