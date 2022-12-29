import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Example Middleware 2');
    const { authorization } = req.headers;
    console.log({ authorization });
    if (!authorization) {
      throw new HttpException('No Authorization Token', HttpStatus.FORBIDDEN);
    }
    if (authorization === 'Basic Og==') {
      next();
    } else {
      throw new HttpException(
        'Invalid Authorization Token',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
