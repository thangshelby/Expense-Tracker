import {
  Component,
  ChangeDetectorRef,
  Output,
  Input,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TransactionService } from '../../../../../core/services/transaction.service';
import { Dialog } from 'primeng/dialog';
import { RadioButton } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {
  TransactionType,
  ExpenseCategoryType,
  PaymentType,
} from '../../../../../shared/types/type';
import {
  cities,
  expenseCategories,
} from '../../../../../core/constants/transactions';

import { firstValueFrom } from 'rxjs';
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
export class NewTransaction implements OnDestroy {
  transactions: TransactionType[] = [];
  activeStep: number = 1;
  cities = cities;
  expenseCategories = expenseCategories;
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
    amount: new FormControl<number>(0, Validators.required),
    expenseDate: new FormControl(new Date(), Validators.required),
    expenseCategory: new FormControl<ExpenseCategoryType>(
      '',
      Validators.required,
    ),
    payment: new FormControl<PaymentType>('', Validators.required),
    comment: new FormControl(''),
    location: new FormControl(''),
    invoice: new FormControl(''),
  });

  submitted = false;
  loading: boolean = true;

  ngOnInit() {}
  ngOnDestroy() {
    this.onToggleDialog();
  }

  @Input({ required: true }) isTransactionDialogVisible!: boolean;
  @Output() isTransactionDialogVisibleChange = new EventEmitter<boolean>();

  onSubmit() {
    this.submitted = true;
    console.log(this.newTransactionForm.getRawValue());
    if (this.newTransactionForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Form Invalid',
        detail: 'Please fill out all required fields correctly.',
      });
      return;
    }

    this.onSaveTransaction();
    this.onToggleDialog();
  }

  onDeleteSelectedTransactions() {}
  onEditTransaction(transaction: TransactionType) {}
  onDeleteTransaction(transaction: TransactionType) {}
  onToggleDialog() {
    this.isTransactionDialogVisibleChange.emit(false);
  }
  private async onSaveTransaction() {
    const transactions = await firstValueFrom(
      this.transactionService.getTransactions(),
    );
    const idNumber = transactions.length + 1;

    const idString = 'txn' + idNumber.toString().padStart(3, '0');

    const formValues = this.newTransactionForm.getRawValue();
    const newTransaction: TransactionType = {
      id: idString,
      name: formValues.name || '',
      payment: formValues.payment || '',
      expenseCategory: formValues.expenseCategory || '',
      expenseDate: formValues.expenseDate || new Date(),
      amount: formValues.amount || 0,
      comment: formValues.comment || 'No Comment',
      invoice: formValues.invoice || '',
      isRecurring: false,
      location: formValues.location || 'Unknown',
    };

    this.transactionService.addTransaction(newTransaction);
    this.newTransactionForm.reset();
    this.activeStep = 1;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Add Transaction Successfully.',
    });
  }
  onUpload(event: any) {
    const uploadedFileName = event.files[0].name;
    this.newTransactionForm.controls['invoice'].setValue(uploadedFileName);
  }
}
