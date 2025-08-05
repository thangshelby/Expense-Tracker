import { Component } from '@angular/core';
import { TransactionTable } from './components/transaction-table/transaction-table';
@Component({
  selector: 'app-transactions',
  imports: [TransactionTable],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {}
