import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Expense } from '../schemas/expense/expense.schema';
import { ExpensesService } from './expenses.service';

@Controller()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: 'get_all_expenses' })
  public async findAll(@Payload() body): Promise<Expense[]> {
    return this.expensesService.findAll(body.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: 'create_expense' })
  public async create(@Payload() body): Promise<Expense> {
    const expense = new Expense();
    expense.amount = body.expense.amount;
    expense.category = body.expense.category;
    expense.title = body.expense.title;
    expense.userId = body.user.sub;

    return this.expensesService.create(expense);
  }
}
