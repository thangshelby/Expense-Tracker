// budget-management.component.ts
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';

import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DatePickerModule } from 'primeng/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {
  months,
  categories,
  budgets,
} from '../../../../core/constants/bugget-management';
import {
  Budget,
  BudgetAlert,
  Transaction,
} from '../../../../core/model/interface/budget-management';
import { Select } from 'primeng/select';
@Component({
  selector: 'app-add-budget',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
    MenuModule,
    ProgressBarModule,
    ChartModule,
    CardModule,
    DividerModule,
    DatePickerModule,
    AutoCompleteModule,
    Select,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './add-budget.html',
  styleUrl: './add-budget.css',
})
export class AddBudget {
  selectedBudget: Budget = {} as Budget;
  newBudget: Budget = {} as Budget;
  isEditing: boolean = false;

  categories = categories;
  months = months;

  getCategoryLabel(category: string): string {
    const categoryInfo = this.categories.find((cat) => cat.value === category);
    return categoryInfo ? categoryInfo.label : category;
  }
  findIcon(newBudget: Budget) {
    return this.categories.find((c) => c.value === newBudget.category)?.icon;
  }
  formatCurrency(amount: number): string {
    return Math.abs(amount).toLocaleString('vi-VN') + ' VND';
  }
}
