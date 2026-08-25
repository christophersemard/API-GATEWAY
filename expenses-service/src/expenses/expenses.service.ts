import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from '../schemas/expense/expense.schema';

@Injectable()
export class ExpensesService {
  public constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}

  public async create(expense: Expense): Promise<Expense> {
    const createdExpense = new this.expenseModel(expense);
    return createdExpense.save();
  }

  public async findAll(userId: string): Promise<Expense[]> {
    return this.expenseModel.find({ userId }).sort({ date: -1 }).exec();
  }
}
