import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema()
export class Expense {
  @Prop()
  title: string;

  @Prop()
  amount: number;

  @Prop({ default: new Date() })
  date: string;

  @Prop()
  category: string;

  @Prop()
  userId: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
