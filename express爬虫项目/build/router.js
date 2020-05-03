"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var analyzer_1 = __importDefault(require("./utils/analyzer"));
var crowller_1 = __importDefault(require("./utils/crowller"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var util_1 = require("./utils/util");
// 业务中间件
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.redirect("/");
    }
};
var router = express_1.Router();
router.get("/", function (req, res) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send("\n      <html>\n        <body>\n          <form method=\"get\" action=\"/logout\">\n            <button>\u9000\u51FA</button>\n          </form>\n          <form method=\"get\" action=\"/getData\">\n            <button>\u722C\u53D6\u6570\u636E</button>\n          </form>\n          <form method=\"get\" action=\"/showData\">\n            <button>\u67E5\u770B\u6570\u636E</button>\n          </form>\n        </body>\n      </html>\n    ");
    }
    else {
        res.send("\n      <html>\n        <body>\n          <form method=\"post\" action=\"/login\">\n            <input type=\"password\" name=\"password\" />\n            <button>\u767B\u5F55</button>\n          </form>\n        </body>\n      </html>\n    ");
    }
});
router.get("/bye", function (req, res) {
    res.json(util_1.getResponseData("bye world!!"));
});
router.get("/logout", function (req, res) {
    if (req.session) {
        req.session.login = undefined;
        res.redirect("/");
    }
});
router.post("/login", function (req, res) {
    var _a = req.body, password = _a.password, username = _a.username;
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send("\n        <html>\n          <body>\n            \u4E0D\u8981\u91CD\u590D\u767B\u5F55\u54E6~\n            <form method=\"get\" action=\"/getData\">\n              <button>\u722C\u53D6\u6570\u636E</button>\n            </form>\n            <form method=\"get\" action=\"/showData\">\n              <button>\u67E5\u770B\u6570\u636E</button>\n            </form>\n          </body>\n        </html>\n      ");
    }
    else {
        if (password === "123" && req.session) {
            req.session.login = true;
            res.send("\n          <html>\n            <body>\n              \u767B\u5F55\u6210\u529F\uFF01\n              <form method=\"get\" action=\"/getData\">\n                <button>\u722C\u53D6\u6570\u636E</button>\n              </form>\n              <form method=\"get\" action=\"/showData\">\n                <button>\u67E5\u770B\u6570\u636E</button>\n              </form>\n            </body>\n          </html>\n        ");
        }
        else {
            res.json(util_1.getResponseData(false, req.userName + " \u767B\u5F55\u5931\u8D25!"));
        }
    }
});
router.get("/getData", checkLogin, function (req, res) {
    var url = "https://www.barretlee.com/blog/archives/";
    var analyzer = analyzer_1.default.getInstance();
    new crowller_1.default(url, analyzer);
    res.json(util_1.getResponseData("数据爬取成功~"));
});
router.get("/showData", checkLogin, function (req, res) {
    try {
        var showPath = path_1.default.resolve(__dirname, "../data/article.json");
        var showData = fs_1.default.readFileSync(showPath, "utf-8");
        res.json(util_1.getResponseData(JSON.parse(showData)));
    }
    catch (error) {
        res.json(util_1.getResponseData(false, "还没有爬取到数据~"));
    }
});
exports.default = router;
