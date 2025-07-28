import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
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
import { TransactionService } from '../../../services/transaction/transaction.service';
import { TransactionType } from '../../../types/type';
import { Dialog } from 'primeng/dialog';
import { RadioButton } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Ripple } from 'primeng/ripple';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    ButtonModule,
    TableModule,
    Dialog,
    // Ripple,
    SelectModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialog,
    InputTextModule,
    TextareaModule,
    CommonModule,
    // FileUpload,
    // DropdownModule,
    // Tag,
    RadioButton,
    // Rating,
    InputTextModule,
    FormsModule,
    InputNumber,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './transaction-table.html',
  styleUrl: './transaction-table.css',
})
export class TransactionTable implements OnInit {
  transactions: TransactionType[] = [];
  selectedTransaction!: TransactionType;
  selectedTransactions: TransactionType[] = [];

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
    this.isTransactionDialogVisible = true;
  }
  onDeleteSelectedTransactions() {}
  onEditTransaction(transaction: TransactionType) {}
  onDeleteTransaction(transaction: TransactionType) {}
  onHideDialog() {}
  onSaveTransaction() {}
}
