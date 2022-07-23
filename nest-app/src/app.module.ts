import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesController } from './votes';
import * as models from './models';
import { AuthController, AuthService, RolesGuard } from './auth';
import { APP_GUARD } from '@nestjs/core';
import { FrameworksControllers } from './frameworks';

// TODO: Outsource connection string to env.
const TYPEORM_CONFIG = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '<username>',
  password: '',
  database: 'framework_rating',
  synchronize: true,
  entities: [...Object.values(models)],
});

@Module({
  imports: [TYPEORM_CONFIG],
  controllers: [AuthController, FrameworksControllers, VotesController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
