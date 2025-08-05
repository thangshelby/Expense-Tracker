import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TransactionService } from '../../../../../core/services/transaction.service';
import { TransactionType } from '../../../../../shared/types/type';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { NewTransaction } from '../new-transaction/new-transaction';

@Component({
  selector: 'app-transaction-table',
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    MultiSelectModule,
    SelectModule,
    CommonModule,
    ButtonModule,
    TableModule,
    SelectModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    TextareaModule,
    CommonModule,
    FileUploadModule,
    InputTextModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    NewTransaction,
  ],
  templateUrl: './transaction-table.html',
  styleUrl: './transaction-table.css',
})
export class TransactionTable implements OnInit {
  transactions: TransactionType[] = [];
  selectedTransaction!: TransactionType;
  selectedTransactions: TransactionType[] = [];
  rowPerPage = 5;
  rowPerPageOptions = [
    {
      value: 5,
    },
    {
      value: 10,
    },
    {
      value: 15,
    },
    {
      value: 20,
    },
  ];

  constructor(
    private transactionService: TransactionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private changedetectorRef: ChangeDetectorRef,
  ) {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data;
    });
  }

  statuses!: any[];
  submitted = false;
  loading: boolean = true;

  activityValues: number[] = [0, 100];

  searchValue: string | undefined;

  ngOnInit() {}

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  isTransactionDialogVisible = false;

  onOpenNew() {
    // console.log(this.isTransactionDialogVisible);
    this.isTransactionDialogVisible = true;
  }
  onDeleteSelectedTransactions() {}
  onEditTransaction(transaction: TransactionType) {}
  onDeleteTransaction(transaction: TransactionType) {}
  onToggleDialog() {}
  onSaveTransaction() {}
  onUpload(value: any) {}
}
