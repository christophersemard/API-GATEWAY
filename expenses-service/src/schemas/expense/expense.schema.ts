import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema()
export class Expense {
  @Prop()
  title: string;

  @Prop()
  amount: number;

  @Prop({ default: Date.now })
  date: Date;

  @Prop()
  category: string;

  @Prop()
  userId: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
