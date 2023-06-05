import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

async function bootstrap() {
    dotenv.config();

  const app = await NestFactory.create(UsersModule);
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
