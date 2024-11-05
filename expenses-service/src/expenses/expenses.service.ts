import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from 'src/schemas/expense/expense.schema';
import { Model, UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class ExpensesService {
  public constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}

  public async create(expense: Expense): Promise<Expense> {
    const createdExpense = new this.expenseModel(expense);
    return createdExpense.save();
  }

  public async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().exec();
  }

  public async findOne(id: string): Promise<Expense> {
    return this.expenseModel.findById(id).exec();
  }

  public async update(
    id: string,
    expense: Expense,
  ): Promise<UpdateWriteOpResult> {
    return this.expenseModel.updateOne({ _id: id }, expense).exec();
  }

  // public async delete(id: string): Promise<UpdateWriteOpResult> {
  //   return this.expenseModel.deleteOne({ _id: id }).exec();
  // }
}
