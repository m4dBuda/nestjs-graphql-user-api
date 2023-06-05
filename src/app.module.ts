import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { controllers, services } from './controllers-and-services';

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...services],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('app/users*', 'app/users/:id*');
  }
}
