import { Router, Request, Response, NextFunction } from "express";
import Analyzer from "./utils/analyzer";
import Crowller from "./utils/crowller";
import path, { dirname } from "path";
import fs from "fs";
import { getResponseData } from "./utils/util";

// 解决了 express库的 .d.ts 类型定义文件描述不准确的问题
interface BodyRequest extends Request {
  body: { [propsName: string]: string | undefined };
}

// 业务中间件
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.redirect("/");
  }
};

const router = Router();
router.get("/", (req: BodyRequest, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`
      <html>
        <body>
          <form method="get" action="/logout">
            <button>退出</button>
          </form>
          <form method="get" action="/getData">
            <button>爬取数据</button>
          </form>
          <form method="get" action="/showData">
            <button>查看数据</button>
          </form>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password" />
            <button>登录</button>
          </form>
        </body>
      </html>
    `);
  }
});
router.get("/bye", (req: BodyRequest, res: Response) => {
  res.json(getResponseData("bye world!!"));
});
router.get("/logout", (req: BodyRequest, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
    res.redirect("/");
  }
});
router.post("/login", (req: BodyRequest, res: Response) => {
  const { password, username } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`
        <html>
          <body>
            不要重复登录哦~
            <form method="get" action="/getData">
              <button>爬取数据</button>
            </form>
            <form method="get" action="/showData">
              <button>查看数据</button>
            </form>
          </body>
        </html>
      `);
  } else {
    if (password === "123" && req.session) {
      req.session.login = true;
      res.send(`
          <html>
            <body>
              登录成功！
              <form method="get" action="/getData">
                <button>爬取数据</button>
              </form>
              <form method="get" action="/showData">
                <button>查看数据</button>
              </form>
            </body>
          </html>
        `);
    } else {
      res.json(getResponseData(false, `${req.userName} 登录失败!`));
    }
  }
});
router.get("/getData", checkLogin, (req: BodyRequest, res: Response) => {
  const url = `https://www.barretlee.com/blog/archives/`;
  const analyzer = Analyzer.getInstance();
  new Crowller(url, analyzer);
  res.json(getResponseData("数据爬取成功~"));
});
router.get("/showData", checkLogin, (req: BodyRequest, res: Response) => {
  try {
    const showPath = path.resolve(__dirname, "../data/article.json");
    const showData = fs.readFileSync(showPath, "utf-8");
    res.json(getResponseData(JSON.parse(showData)));
  } catch (error) {
    res.json(getResponseData(false, "还没有爬取到数据~"));
  }
});

export default router;
