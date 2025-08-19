// category-management.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  CategoryService,
  Category,
  CreateCategoryRequest,
} from '../../../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule, DatePicker } from 'primeng/datepicker';
import { PaginatorModule, Paginator } from 'primeng/paginator';
import { TransactionType } from '../../../../../shared/types/type';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.html',
  styleUrls: ['./category-management.css'],
  imports: [
    DialogModule,
    SelectModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    DatePickerModule,
    PaginatorModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class CategoryManagement implements OnInit {
  paymentMethods = [
    { label: 'Tiền mặt', value: 'Cash', icon: 'pi-money-bill' },
    { label: 'Chuyển khoản', value: 'Bank Transfer', icon: 'pi-credit-card' },
    { label: 'Ví điện tử', value: 'E-Wallet', icon: 'pi-wallet' },
    { label: 'Thẻ tín dụng', value: 'Credit Card', icon: 'pi-credit-card' },
  ];
  loading = false;
  first = 0;
  rows = 10;
  filteredTransactions: TransactionType[] = [];
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  selectedTransaction: TransactionType | null = null;
  selectedPaymentMethod = '';

  displayDialog = false;
  displayDeleteDialog = false;
  isEditMode = false;
  selectedCategory: Category | null = null;

  categoryForm: FormGroup;
  searchTerm = '';
  filterType: 'all' | 'income' | 'expense' = 'all';

  availableIcons: string[] = [];
  availableColors: string[] = [];
  selectedIcon = '';
  selectedColor = '';

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      type: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.availableIcons = this.categoryService.getAvailableIcons();
    this.availableColors = this.categoryService.getAvailableColors();
  }
  clearFilters() {
    this.searchTerm = '';
    // this.selectedCategory = '';
    this.selectedPaymentMethod = '';
    // this.dateRange = [];
    this.applyFilters();
  }
  loadCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không thể tải danh sách danh mục',
        });
        this.loading = false;
      },
    });
  }

  applyFilters() {
    let filtered = [...this.categories];

    // Filter by type
    if (this.filterType !== 'all') {
      filtered = filtered.filter((cat) => cat.type === this.filterType);
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (cat) =>
          cat.name.toLowerCase().includes(term) ||
          cat.description?.toLowerCase().includes(term),
      );
    }

    this.filteredCategories = filtered;
  }

  onFilterChange() {
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  showCreateDialog() {
    this.isEditMode = false;
    this.selectedCategory = null;
    this.resetForm();
    this.displayDialog = true;
  }

  showEditDialog(category: Category) {
    this.isEditMode = true;
    this.selectedCategory = category;
    this.populateForm(category);
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
    this.resetForm();
  }

  resetForm() {
    this.categoryForm.reset({
      name: '',
      type: 'expense',
      description: '',
    });
    this.selectedIcon = '';
    this.selectedColor = '';
  }

  populateForm(category: Category) {
    this.categoryForm.patchValue({
      name: category.name,
      type: category.type,
      description: category.description || '',
    });
    this.selectedIcon = category.icon;
    this.selectedColor = category.color;
  }
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  }
  getPaymentMethodLabel(method: string): string {
    const found = this.paymentMethods.find((pm) => pm.value === method);
    return found ? found.label : method;
  }

  getPaymentMethodIcon(method: string): string {
    const found = this.paymentMethods.find((pm) => pm.value === method);
    return found ? found.icon : 'pi-money-bill';
  }

  onSubmit() {
    if (this.categoryForm.valid && this.selectedIcon && this.selectedColor) {
      this.loading = true;

      const formData = this.categoryForm.value;
      const categoryData: CreateCategoryRequest = {
        name: formData.name,
        type: formData.type,
        icon: this.selectedIcon,
        color: this.selectedColor,
        description: formData.description,
      };

      if (this.isEditMode && this.selectedCategory) {
        // Update existing category
        this.categoryService
          .updateCategory(this.selectedCategory.id, categoryData)
          .subscribe({
            next: (updatedCategory) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Cập nhật danh mục thành công',
              });
              this.hideDialog();
              this.loading = false;
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Không thể cập nhật danh mục',
              });
              this.loading = false;
            },
          });
      } else {
        // Create new category
        this.categoryService.createCategory(categoryData).subscribe({
          next: (newCategory) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Tạo danh mục mới thành công',
            });
            this.hideDialog();
            this.loading = false;
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Không thể tạo danh mục mới',
            });
            this.loading = false;
          },
        });
      }
    } else {
      // Mark form fields as touched to show validation errors
      Object.keys(this.categoryForm.controls).forEach((key) => {
        this.categoryForm.get(key)?.markAsTouched();
      });

      if (!this.selectedIcon) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cảnh báo',
          detail: 'Vui lòng chọn biểu tượng',
        });
      }

      if (!this.selectedColor) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cảnh báo',
          detail: 'Vui lòng chọn màu sắc',
        });
      }
    }
  }

  confirmDelete(category: Category) {
    this.confirmationService.confirm({
      message: `Bạn có chắc chắn muốn xóa danh mục "${category.name}"?`,
      header: 'Xác nhận xóa',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.deleteCategory(category);
      },
    });
  }

  deleteCategory(category: Category) {
    this.loading = true;
    this.categoryService.deleteCategory(category.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Xóa danh mục thành công',
        });
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không thể xóa danh mục',
        });
        this.loading = false;
      },
    });
  }

  toggleCategoryStatus(category: Category) {
    this.categoryService.toggleCategoryStatus(category.id).subscribe({
      next: (updatedCategory) => {
        const action = updatedCategory.isActive ? 'kích hoạt' : 'vô hiệu hóa';
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: `Đã ${action} danh mục thành công`,
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không thể thay đổi trạng thái danh mục',
        });
      },
    });
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  getFieldError(fieldName: string): string {
    const field = this.categoryForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName === 'name' ? 'Tên danh mục' : 'Loại danh mục'} là bắt buộc`;
      }
      if (field.errors['minlength']) {
        return 'Tên danh mục phải có ít nhất 2 ký tự';
      }
    }
    return '';
  }
}
