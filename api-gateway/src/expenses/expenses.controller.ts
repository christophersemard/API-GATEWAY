import { Body, Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Param } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Controller('expenses')
export class ExpensesController {
  constructor(
    @Inject('EXPENSES_SERVICE') private readonly expensesService: ClientProxy,
  ) {}

  @Get('')
  async getExpenses(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return { error: 'No token' };
    }

    return this.expensesService
      .send({ cmd: 'get_all_expenses' }, { token }) // Envoi du token dans le message RPC
      .pipe(
        catchError((error) => {
          // Si le microservice renvoie une erreur, la capturer et transformer en réponse HTTP
          if (error.statusCode === 401) {
            throw new HttpException(
              { message: error.message, error: error.error },
              HttpStatus.UNAUTHORIZED,
            );
          }
          return throwError(() => error);
        }),
      );
  }

  @Post('')
  async createExpense(
    @Request() req,
    @Body()
    expense: {
      amount: number;
      title: string;
      category: string;
      userId: string;
    },
  ) {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return { error: 'No token' };
    }

    return this.expensesService
      .send({ cmd: 'create_expense' }, { token, expense }) // Envoi du token dans le message RPC
      .pipe(
        catchError((error) => {
          // Si le microservice renvoie une erreur, la capturer et transformer en réponse HTTP
          if (error.statusCode === 401) {
            throw new HttpException(
              { message: error.message, error: error.error },
              HttpStatus.UNAUTHORIZED,
            );
          }
          return throwError(() => error);
        }),
      );
  }
}
