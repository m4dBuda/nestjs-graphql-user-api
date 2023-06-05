import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  private readonly jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
  }

  use(req: Request & { user?: any }, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, this.jwtSecret);
        req.user = decoded;
      } catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
      }
    } else {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    next();
  }
}
