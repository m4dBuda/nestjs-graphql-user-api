import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  private readonly jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
  }

  generateToken(payload: any): string {
    return jwt.sign(payload, this.jwtSecret);
  }

  verifyToken(token: string): any {
    return jwt.verify(token, this.jwtSecret);
  }
}
