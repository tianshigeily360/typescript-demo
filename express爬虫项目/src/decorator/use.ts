import { RequestHandler } from "express";
import { CrowllerController, LoginController } from "../controller";

export function use(middleware: RequestHandler) {
  return function(target: CrowllerController | LoginController, key: string) {
    const OriginMiddlewares: RequestHandler[] =
      Reflect.getMetadata("middlewares", target, key) || [];
    OriginMiddlewares.push(middleware);
    Reflect.defineMetadata("middlewares", OriginMiddlewares, target, key);
  };
}
