import {
  Component,
  ChangeDetectorRef,
  OnInit,
  Output,
  Input,
  EventEmitter,
} from '@angular/core';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { Dialog } from 'primeng/dialog';
import { RadioButton } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TransactionType } from '../../../types/type';

@Component({
  selector: 'app-new-transaction',
  imports: [
    InputGroupAddonModule,
    InputGroupModule,
    InputNumberModule,
    DatePickerModule,
    ReactiveFormsModule,
    TagModule,
    StepperModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MultiSelectModule,
    SelectModule,
    ButtonModule,
    FormsModule,
    Dialog,
    SelectModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialog,
    TextareaModule,
    CommonModule,
    FileUploadModule,
    RadioButton,
    FormsModule,
    InputNumber,
  ],
  templateUrl: './new-transaction.html',
  styleUrl: './new-transaction.css',
})
export class NewTransaction {
  transactions: TransactionType[] = [];
  activeStep: number = 1;
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  expenseCategories = [
    {
      label: 'Shopping',
    },
    {
      label: 'Food',
    },
    {
      label: 'Drink',
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

  newTransactionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    invoice: new FormControl('', Validators.required),
    expenseDate: new FormControl('', Validators.required),
    expenseCategory: new FormControl('', Validators.required),
    payment: new FormControl('', Validators.required),
  });

  submitted = false;
  loading: boolean = true;

  ngOnInit() {}

  @Input({ required: true }) isTransactionDialogVisible!: boolean;
  @Output() isTransactionDialogVisibleChange = new EventEmitter<boolean>();
  onSubmit() {
    this.submitted = true;

    // if (this.newTransactionForm.invalid) {
    //   console.log(this.newTransactionForm.invalid);
    //   this.messageService.add({
    //     severity: 'warn',
    //     summary: 'Form Invalid',
    //     detail: 'Please fill out all required fields correctly.',
    //   });
    //   return;
    // }

    const newTransaction: TransactionType = {
      id: '1',
      name: '',
      payment: 'Cash',
      expenseCategory: 'Food',
      expenseDate: new Date(),
      amount: 1000,
      comment: 'No Comment',
      invoice: '',
      isRecurring: false,
      location: 'London',
      weekNumber: 1,
    };

    this.transactionService.addTransaction(newTransaction);
    this.transactionService.getTransactions().subscribe((data) => {
      console.log(data);
    });
    // .subscribe({
    //   next: (response) => {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Transaction Added',
    //       detail: 'The transaction has been added successfully.',
    //     });

    //     this.transactions.push(response); // Cập nhật danh sách nếu cần
    //     this.isTransactionDialogVisible = false;
    //     this.newTransactionForm.reset();
    //     this.submitted = false;
    //     this.changedetectorRef.detectChanges();
    //   },
    //   error: (error) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'An error occurred while adding the transaction.',
    //     });
    //     console.error('Transaction submission error:', error);
    //   },
    // });
  }

  onDeleteSelectedTransactions() {}
  onEditTransaction(transaction: TransactionType) {}
  onDeleteTransaction(transaction: TransactionType) {}
  onToggleDialog() {
    this.isTransactionDialogVisibleChange.emit(false);
  }
  onSaveTransaction() {}
  onUpload(event: any) {
    const uploadedFileName = event.files[0].name;
    this.newTransactionForm.controls['invoice'].setValue(uploadedFileName);
  }
}
