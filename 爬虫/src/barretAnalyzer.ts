import fs from "fs";
// 可以将页面HTML以jquery方式操作的库
import cheerio from "cheerio";
import { Analyzer } from "./crowller";

// 每一篇文章的数据结构
interface article {
  title: string;
  time: string;
}

// 爬出的带时间戳内容的数据结构
interface ArticleResult {
  time: string;
  data: article[];
}

// 导出的 JSON 文件内容的数据结构
interface Content {
  [propName: string]: article[];
}

// 给类做类型注解要用 implements
export default class Barret implements Analyzer {
  private static instance: Barret;
  static getInstance() {
    if (!this.instance) {
      this.instance = new Barret();
    }
    return this.instance;
  }
  // 根据页面 html 获取元素并返回爬取的数据
  private getArticleInfo(html: string) {
    const $ = cheerio.load(html);
    const articles = $(".cate-detail ul li");
    const articleArr: article[] = [];
    articles.map((index, ele) => {
      const title = $(ele)
        .find("a")
        .eq(0)
        .text();
      const time = $(ele)
        .find("span")
        .text()
        .split(" ·")[0]
        .split("(")[1];
      articleArr.push({ title, time });
    });
    return {
      time: `${new Date().getFullYear()}-${new Date().getMonth() +
        1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      data: articleArr
    };
  }
  // 读取 JSON 文件，并重新生成内容
  private generateJsonContent(result: ArticleResult, filePath: string) {
    let fileContent: Content = {};
    // 判断要写入的文件地址是否存在
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[result.time] = result.data;
    return fileContent;
  }
  analyze(html: string, filePath: string) {
    const articleInfo = this.getArticleInfo(html);
    const fileContent = this.generateJsonContent(articleInfo, filePath);
    return JSON.stringify(fileContent);
  }
  private constructor() {}
}
