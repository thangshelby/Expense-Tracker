// loan-management.component.ts
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
// loan-management.module.ts
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
// import { InputTextareaModule } from 'primeng/inputtextarea';
// import { CalendarModule } from 'primeng/calendar';
// import { DropdownModule } from 'primeng/dropdown';
export interface LoanDebt {
  id: number;
  type: 'loan' | 'debt'; // vay hoặc nợ
  creditorDebtor: string; // người cho vay hoặc người nợ
  amount: number;
  description: string;
  interestRate?: number;
  dueDate: Date;
  status: 'active' | 'paid' | 'overdue';
  createdDate: Date;
  paidAmount?: number;
  remainingAmount?: number;
}

@Component({
  selector: 'app-loan-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    SelectButtonModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
    AutoCompleteModule,
    //  CalendarModule,
    // DropdownModule,
    // InputTextareaModule,
  ],
  templateUrl: './loan-management.html',
  styleUrl: './loan-management.css',
})
export class LoanManagementComponent implements OnInit {
  loanDebts: LoanDebt[] = [];
  displayDialog: boolean = false;
  displayPaymentDialog: boolean = false;
  selectedLoanDebt: LoanDebt = {} as LoanDebt;
  newLoanDebt: LoanDebt = {} as LoanDebt;
  isEditing: boolean = false;
  paymentAmount: number = 0;

  // Statistics
  totalLoans: number = 0;
  totalDebts: number = 0;
  totalOverdue: number = 0;

  // Filters
  statusOptions = [
    { label: 'Tất cả', value: null },
    { label: 'Đang hoạt động', value: 'active' },
    { label: 'Đã thanh toán', value: 'paid' },
    { label: 'Quá hạn', value: 'overdue' },
  ];

  typeOptions = [
    { label: 'Tất cả', value: null },
    { label: 'Khoản vay', value: 'loan' },
    { label: 'Khoản nợ', value: 'debt' },
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.loadData();
    this.calculateStatistics();
  }

  loadData() {
    // Mock data - trong thực tế sẽ gọi API
    this.loanDebts = [
      {
        id: 1,
        type: 'loan',
        creditorDebtor: 'Nguyễn Văn A',
        amount: 10000000,
        description: 'Vay tiền khởi nghiệp',
        interestRate: 1.2,
        dueDate: new Date('2024-12-31'),
        status: 'active',
        createdDate: new Date('2024-01-15'),
        paidAmount: 2000000,
        remainingAmount: 8000000,
      },
      {
        id: 2,
        type: 'debt',
        creditorDebtor: 'Trần Thị B',
        amount: 5000000,
        description: 'Nợ tiền mua hàng',
        dueDate: new Date('2024-10-15'),
        status: 'overdue',
        createdDate: new Date('2024-08-01'),
        paidAmount: 0,
        remainingAmount: 5000000,
      },
    ];
  }

  calculateStatistics() {
    this.totalLoans = this.loanDebts
      .filter((item) => item.type === 'loan' && item.status === 'active')
      .reduce((sum, item) => sum + (item.remainingAmount || item.amount), 0);

    this.totalDebts = this.loanDebts
      .filter((item) => item.type === 'debt' && item.status === 'active')
      .reduce((sum, item) => sum + (item.remainingAmount || item.amount), 0);

    this.totalOverdue = this.loanDebts
      .filter((item) => item.status === 'overdue')
      .reduce((sum, item) => sum + (item.remainingAmount || item.amount), 0);
  }

  showAddDialog() {
    this.newLoanDebt = {
      id: 0,
      type: 'loan',
      creditorDebtor: '',
      amount: 0,
      description: '',
      interestRate: 0,
      dueDate: new Date(),
      status: 'active',
      createdDate: new Date(),
      paidAmount: 0,
      remainingAmount: 0,
    };
    this.isEditing = false;
    this.displayDialog = true;
  }

  showEditDialog(loanDebt: LoanDebt) {
    this.newLoanDebt = { ...loanDebt };
    this.isEditing = true;
    this.displayDialog = true;
  }

  showPaymentDialog(loanDebt: LoanDebt) {
    this.selectedLoanDebt = loanDebt;
    this.paymentAmount = 0;
    this.displayPaymentDialog = true;
  }

  saveLoanDebt() {
    if (this.isEditing) {
      const index = this.loanDebts.findIndex(
        (item) => item.id === this.newLoanDebt.id,
      );
      if (index !== -1) {
        this.loanDebts[index] = { ...this.newLoanDebt };
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Cập nhật thành công!',
        });
      }
    } else {
      this.newLoanDebt.id =
        Math.max(...this.loanDebts.map((item) => item.id), 0) + 1;
      this.newLoanDebt.remainingAmount = this.newLoanDebt.amount;
      this.loanDebts.push({ ...this.newLoanDebt });
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Thêm mới thành công!',
      });
    }
    this.displayDialog = false;
    this.calculateStatistics();
  }

  makePayment() {
    if (
      this.paymentAmount > 0 &&
      this.paymentAmount <= (this.selectedLoanDebt.remainingAmount || 0)
    ) {
      const index = this.loanDebts.findIndex(
        (item) => item.id === this.selectedLoanDebt.id,
      );
      if (index !== -1) {
        this.loanDebts[index].paidAmount =
          (this.loanDebts[index].paidAmount || 0) + this.paymentAmount;
        this.loanDebts[index].remainingAmount =
          (this.loanDebts[index].remainingAmount || 0) - this.paymentAmount;

        if (this.loanDebts[index].remainingAmount === 0) {
          this.loanDebts[index].status = 'paid';
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: `Thanh toán ${this.paymentAmount.toLocaleString('vi-VN')} VND thành công!`,
        });

        this.displayPaymentDialog = false;
        this.calculateStatistics();
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Số tiền thanh toán không hợp lệ!',
      });
    }
  }

  deleteLoanDebt(loanDebt: LoanDebt) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa bản ghi này?',
      header: 'Xác nhận xóa',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loanDebts = this.loanDebts.filter(
          (item) => item.id !== loanDebt.id,
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Xóa thành công!',
        });
        this.calculateStatistics();
      },
    });
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'active':
        return 'info';
      case 'paid':
        return 'success';
      case 'overdue':
        return 'danger';
      default:
        return 'info';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active':
        return 'Đang hoạt động';
      case 'paid':
        return 'Đã thanh toán';
      case 'overdue':
        return 'Quá hạn';
      default:
        return status;
    }
  }

  getTypeLabel(type: string): string {
    return type === 'loan' ? 'Khoản vay' : 'Khoản nợ';
  }

  formatCurrency(amount: number): string {
    return amount.toLocaleString('vi-VN') + ' VND';
  }
}
