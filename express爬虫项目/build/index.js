"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
// 使用中间件对 express 的 req&res 进行修改时，类型注解可能并不能通过，这里可以单独定义一个 .d.ts 文件通过类型融合的方式达到目的
app.use(function (req, res, next) {
    req.userName = "jm";
    next();
});
app.use(cookie_session_1.default({
    name: "session",
    keys: ["jmaking"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(router_1.default);
app.listen(1541, function () {
    console.log("server is running...");
});
