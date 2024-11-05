import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgClass, CommonModule } from '@angular/common';

interface Expense {
  name: string;
  amount: number;
  category: string;
}

@Component({
  selector: 'app-expense-table',
  standalone: true, // Déclarer comme standalone
  templateUrl: './expense-table.component.html',
  imports: [FormsModule, NgIf, NgFor, NgClass, CommonModule], // Importer explicitement FormsModule, NgIf, NgFor et CommonModule
  styles: [],
})
export class ExpenseTableComponent {
  @Input() expenses: Expense[] = []; // Déclarer la propriété expenses comme @Input
}
