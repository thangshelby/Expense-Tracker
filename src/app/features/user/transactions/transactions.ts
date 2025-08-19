import { Component } from '@angular/core';
import { TransactionTable } from './components/transaction-table/transaction-table';
import { CategoryManagement } from './components/category-management/category-management';
@Component({
  selector: 'app-transactions',
  imports: [TransactionTable, CategoryManagement],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {}
