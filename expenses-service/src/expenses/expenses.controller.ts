import { Controller, Get, Post, Put, Param } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from 'src/schemas/expense/expense.schema';
import { Body } from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';
import { MessagePattern } from '@nestjs/microservices';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: 'get_all_expenses' })
  public async findAll(): Promise<Expense[]> {
    return this.expensesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: 'get_one_expense' })
  public async findOne(@Param('id') id: string): Promise<Expense> {
    return this.expensesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: 'create_expense' })
  public async create(@Body() body) {
    let bodyExpense = body.expense;
    let expense = new Expense();
    expense.amount = bodyExpense.amount;
    expense.category = bodyExpense.category;
    expense.title = bodyExpense.title;
    expense.userId = bodyExpense.userId;

    return this.expensesService.create(expense);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: 'update_expense' })
  public async update(
    @Param('id') id: string,
    @Body() expense: Expense,
  ): Promise<UpdateWriteOpResult> {
    return this.expensesService.update(id, expense);
  }

  // @MessagePattern({ cmd: 'delete_expense' })
  // public async delete(@Param('id') id: string): Promise<UpdateWriteOpResult> {
  //   return this.expensesService.delete(id);
  // }
}
