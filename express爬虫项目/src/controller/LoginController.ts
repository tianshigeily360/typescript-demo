import { Response } from "express";
import { BodyRequest, getIsLogin } from "../utils/util";
import "reflect-metadata";
import { constructor, get, post } from "../decorator";
import { getResponseData } from "../utils/util";

@constructor("/")
export class LoginController {
  @post("/login")
  login(req: BodyRequest, res: Response): void {
    const { password, username } = req.body;
    const isLogin = getIsLogin(req);
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
  }
  @get("/bye")
  bye(req: BodyRequest, res: Response): void {
    res.json(getResponseData("bye world!!"));
  }
  @get("/logout")
  logout(req: BodyRequest, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
      res.redirect("/");
    }
  }
  @get("/")
  home(req: BodyRequest, res: Response): void {
    const isLogin = getIsLogin(req);
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
  }
}
