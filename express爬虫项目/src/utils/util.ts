import { Request } from "express";

interface Result {
  success: Boolean;
  errMsg?: string;
  data: any;
}

export interface BodyRequest extends Request {
  body: { [propsName: string]: string | undefined };
}

export const getResponseData = (data: any, errMsg?: string): Result => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data
    };
  }
  return {
    success: true,
    data
  };
};

export const getIsLogin = (req: BodyRequest): Boolean => {
  return !!(req.session ? req.session.login : false);
};
