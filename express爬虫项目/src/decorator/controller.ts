import router from "../router";
import { RequestHandler } from "express";
import { Methods } from "./request";

export function constructor(root: string) {
  return function(constructor: any) {
    for (let key in constructor.prototype) {
      const path: string = Reflect.getMetadata(
        "path",
        constructor.prototype,
        key
      );
      const middlewares: RequestHandler[] = Reflect.getMetadata(
        "middlewares",
        constructor.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        "method",
        constructor.prototype,
        key
      );
      const handler = constructor.prototype[key];
      if (path && method) {
        const fullPath = root === "/" ? path : `${root}${path}`;
        if (middlewares && middlewares.length) {
          router[method](fullPath, ...middlewares, handler);
        } else {
          router[method](fullPath, handler);
        }
      }
    }
  };
}
