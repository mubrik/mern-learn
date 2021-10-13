import * as express from 'express';
import type { RequestHandler } from "express";
/* testing out middlewares, this just logs out requests info */
const loggerMiddleware: RequestHandler = (request: express.Request, response: express.Response, next) =>  {
  console.log(`${request.method} ${request.path}`);
  next();
};

export default loggerMiddleware;
