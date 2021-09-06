import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const chalk = require('chalk');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {
    let date = new Date();
    console.log(date.toISOString(),chalk.green(req.url),chalk.yellow(req.method));
    next();
  }
}