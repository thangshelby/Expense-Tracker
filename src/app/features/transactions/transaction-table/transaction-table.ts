import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressBar } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { mockTransactions } from '../../../constants/transactions';
import { Representative } from '../../../types/type';

@Component({
  selector: 'app-transaction-table',
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MultiSelectModule,
    SelectModule,
    CommonModule,
    ProgressBar,
    ButtonModule,
  ],
  templateUrl: './transaction-table.html',
  styleUrl: './transaction-table.css',
})
export class TransactionTable implements OnInit {
  transactions = mockTransactions;

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  searchValue: string | undefined;

  // constructor(private customerService: CustomerService) {}

  ngOnInit() {}

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  getSeverity(status: string) {
    switch (status.toLowerCase()) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warn';

      case 'renewal':
        return null;
      default:
        return null;
    }
  }
}
