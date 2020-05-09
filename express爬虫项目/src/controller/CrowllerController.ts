import { Request, Response, NextFunction } from "express";
import { BodyRequest, getIsLogin } from "../utils/util";
import path from "path";
import fs from "fs";
import Analyzer from "../utils/analyzer";
import Crowller from "../utils/crowller";
import "reflect-metadata";
import { constructor, use, get } from "../decorator";
import { getResponseData } from "../utils/util";

// 业务中间件
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  console.log("check middleware");
  const isLogin = getIsLogin(req);
  if (isLogin) {
    next();
  } else {
    res.redirect("/");
  }
};

const testLogin = (req: Request, res: Response, next: NextFunction) => {
  console.log("test middleware");
  next();
};

@constructor("/jm")
export class CrowllerController {
  @get("/getData")
  @use(checkLogin)
  getData(req: BodyRequest, res: Response): void {
    const url = `https://www.barretlee.com/blog/archives/`;
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    res.json(getResponseData("数据爬取成功~"));
  }
  @get("/showData")
  @use(checkLogin)
  @use(testLogin)
  showData(req: BodyRequest, res: Response): void {
    try {
      const showPath = path.resolve(__dirname, "../../data/article.json");
      const showData = fs.readFileSync(showPath, "utf-8");
      res.json(getResponseData(JSON.parse(showData)));
    } catch (error) {
      res.json(getResponseData(false, "还没有爬取到数据~"));
    }
  }
}
