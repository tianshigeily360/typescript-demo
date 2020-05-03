"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
// 可以将页面HTML以jquery方式操作的库
var cheerio_1 = __importDefault(require("cheerio"));
// 给类做类型注解要用 implements
var Barret = /** @class */ (function () {
    function Barret() {
    }
    Barret.getInstance = function () {
        if (!this.instance) {
            this.instance = new Barret();
        }
        return this.instance;
    };
    // 根据页面 html 获取元素并返回爬取的数据
    Barret.prototype.getArticleInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var articles = $(".cate-detail ul li");
        var articleArr = [];
        articles.map(function (index, ele) {
            var title = $(ele)
                .find("a")
                .eq(0)
                .text();
            var time = $(ele)
                .find("span")
                .text()
                .split(" ·")[0]
                .split("(")[1];
            articleArr.push({ title: title, time: time });
        });
        return {
            time: new Date().getFullYear() + "-" + (new Date().getMonth() +
                1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
            data: articleArr
        };
    };
    // 读取 JSON 文件，并重新生成内容
    Barret.prototype.generateJsonContent = function (result, filePath) {
        var fileContent = {};
        // 判断要写入的文件地址是否存在
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[result.time] = result.data;
        return fileContent;
    };
    Barret.prototype.analyze = function (html, filePath) {
        var articleInfo = this.getArticleInfo(html);
        var fileContent = this.generateJsonContent(articleInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return Barret;
}());
exports.default = Barret;
