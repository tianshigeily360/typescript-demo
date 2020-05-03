import express, { Request, Response, NextFunction } from "express";
import router from "./router";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// 使用中间件对 express 的 req&res 进行修改时，类型注解可能并不能通过，这里可以单独定义一个 .d.ts 文件通过类型融合的方式达到目的
app.use((req: Request, res: Response, next: NextFunction) => {
  req.userName = "jm";
  next();
});
app.use(
  cookieSession({
    name: "session",
    keys: ["jmaking"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
app.use(router);
app.listen(1541, () => {
  console.log("server is running...");
});
