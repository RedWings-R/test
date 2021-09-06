import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';
import { UsersModule } from './users/users.module';
import { HistoriqueModule } from './historique/historique.module';
import { VehiculeModule } from './vehicule/vehicule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    HistoriqueModule,
    VehiculeModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
