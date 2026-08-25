import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
// import { ExpensesModule } from './expenses/expenses.module';
import { ExpensesController } from './expenses/expenses.controller';

@Module({
  controllers: [AppController, ExpensesController],
  imports: [
    // ExpensesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env', '.env'],
    }),
    ClientsModule.registerAsync([
      {
        name: 'USERS_SERVICE',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('USERS_SERVICE_HOST', 'localhost'),
            port: Number(config.get('USERS_SERVICE_PORT', 3001)),
          },
        }),
      },
      {
        name: 'EXPENSES_SERVICE',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('EXPENSES_SERVICE_HOST', 'localhost'),
            port: Number(config.get('EXPENSES_SERVICE_PORT', 3002)),
          },
        }),
      },
    ]),
  ],
})
export class AppModule {}
