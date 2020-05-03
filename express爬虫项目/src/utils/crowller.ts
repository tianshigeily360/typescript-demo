import fs from "fs";
import path from "path";
// 可以获取网址 HTML 内容的库
import superagent from "superagent";

// 把耦合代码抽象出去
// 爬虫业务逻辑，抽离到其他文件中
// 这个通用文件只用来读取 HTML 以及将爬取的数据做写入

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crowller {
  private filePath = path.resolve(__dirname, "../../data/article.json");
  // 获取 url 的 html
  private async getRawHtml() {
    const res = await superagent.get(this.url);
    return res.text;
  }

  // 写入 JSON 文件
  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
  // 初始化主逻辑
  async initSpiderProgress() {
    const html = await this.getRawHtml();
    // 爬虫逻辑
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }
  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProgress();
  }
}

export default Crowller;
