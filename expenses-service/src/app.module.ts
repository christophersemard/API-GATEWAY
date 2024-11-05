import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseSchema } from './schemas/expense/expense.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
// import { ExpensesModule } from './expenses/expenses.module';
import { ExpensesController } from './expenses/expenses.controller';
import { ConfigModule } from '@nestjs/config';
import { ExpensesService } from './expenses/expenses.service';

@Module({
  imports: [
    // ExpensesModule,

    ConfigModule,
    MongooseModule.forRoot('mongodb://localhost:27017/expenses'),
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AppController, ExpensesController],
  providers: [AppService, JwtService, ExpensesService],
})
export class AppModule {}
