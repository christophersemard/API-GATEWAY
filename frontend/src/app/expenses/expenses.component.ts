import { Component } from '@angular/core';
import { ExpenseTableComponent } from '../expense-table/expense-table.component';
import { FormsModule } from '@angular/forms';

interface Expense {
  name: string;
  amount: number;
  category: string;
}

@Component({
  selector: 'app-expenses',
  standalone: true, // Déclarer comme standalone
  templateUrl: './expenses.component.html',
  imports: [ExpenseTableComponent, FormsModule], // Importer explicitement ExpenseTableComponent
  styles: [],
})
export class ExpensesComponent {
  newExpense: Expense = { name: '', amount: 0, category: '' };
  expenses: Expense[] = [];

  addExpense() {
    const expense = { ...this.newExpense };
    this.expenses.push(expense);
    this.newExpense = { name: '', amount: 0, category: '' };
  }
}
