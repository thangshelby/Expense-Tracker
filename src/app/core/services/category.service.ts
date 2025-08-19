// category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryRequest {
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  // Default categories
  private defaultCategories: Category[] = [
    // Expense Categories
    {
      id: 'cat-001',
      name: 'Ăn uống',
      icon: 'pi-shopping-bag',
      color: '#ef4444',
      type: 'expense',
      description: 'Chi phí ăn uống, nhà hàng, đồ ăn',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cat-002',
      name: 'Giải trí',
      icon: 'pi-play-circle',
      color: '#8b5cf6',
      type: 'expense',
      description: 'Phim ảnh, game, du lịch',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cat-003',
      name: 'Giao thông',
      icon: 'pi-car',
      color: '#06b6d4',
      type: 'expense',
      description: 'Xăng xe, grab, taxi, vé xe',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cat-004',
      name: 'Tiện ích',
      icon: 'pi-home',
      color: '#f59e0b',
      type: 'expense',
      description: 'Điện, nước, internet, điện thoại',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cat-005',
      name: 'Y tế',
      icon: 'pi-heart',
      color: '#10b981',
      type: 'expense',
      description: 'Khám bệnh, thuốc men, bảo hiểm y tế',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cat-006',
      name: 'Mua sắm',
      icon: 'pi-shopping-cart',
      color: '#f97316',
      type: 'expense',
      description: 'Quần áo, đồ gia dụng, mỹ phẩm',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cat-007',
      name: 'Giáo dục',
      icon: 'pi-book',
      color: '#3b82f6',
      type: 'expense',
      description: 'Học phí, sách vở, khóa học',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Income Categories
    {
      id: 'cat-101',
      name: 'Lương',
      icon: 'pi-money-bill',
      color: '#22c55e',
      type: 'income',
      description: 'Lương chính, phụ cấp',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cat-102',
      name: 'Freelance',
      icon: 'pi-briefcase',
      color: '#6366f1',
      type: 'income',
      description: 'Công việc tự do, dự án',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cat-103',
      name: 'Đầu tư',
      icon: 'pi-chart-line',
      color: '#8b5cf6',
      type: 'income',
      description: 'Cổ tức, lãi suất, crypto',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  constructor(private http: HttpClient) {
    // Load categories from localStorage or use defaults
    this.loadCategories();
  }

  private loadCategories() {
    const stored = localStorage.getItem('categories');
    const categories = stored ? JSON.parse(stored) : this.defaultCategories;
    this.categoriesSubject.next(categories);
  }

  private saveCategories(categories: Category[]) {
    localStorage.setItem('categories', JSON.stringify(categories));
    this.categoriesSubject.next(categories);
  }

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }

  getCategoriesByType(type: 'income' | 'expense'): Observable<Category[]> {
    return new Observable((observer) => {
      this.categories$.subscribe((categories) => {
        observer.next(
          categories.filter((cat) => cat.type === type && cat.isActive),
        );
      });
    });
  }

  getCategoryById(id: string): Category | undefined {
    return this.categoriesSubject.value.find((cat) => cat.id === id);
  }

  createCategory(categoryData: CreateCategoryRequest): Observable<Category> {
    return new Observable((observer) => {
      const newCategory: Category = {
        id: 'cat-' + Date.now(),
        ...categoryData,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const categories = [...this.categoriesSubject.value, newCategory];
      this.saveCategories(categories);

      observer.next(newCategory);
      observer.complete();
    });
  }

  updateCategory(id: string, updates: Partial<Category>): Observable<Category> {
    return new Observable((observer) => {
      const categories = this.categoriesSubject.value.map((cat) =>
        cat.id === id ? { ...cat, ...updates, updatedAt: new Date() } : cat,
      );

      this.saveCategories(categories);

      const updatedCategory = categories.find((cat) => cat.id === id);
      if (updatedCategory) {
        observer.next(updatedCategory);
      }
      observer.complete();
    });
  }

  deleteCategory(id: string): Observable<boolean> {
    return new Observable((observer) => {
      const categories = this.categoriesSubject.value.filter(
        (cat) => cat.id !== id,
      );
      this.saveCategories(categories);
      observer.next(true);
      observer.complete();
    });
  }

  toggleCategoryStatus(id: string): Observable<Category> {
    return new Observable((observer) => {
      const categories = this.categoriesSubject.value.map((cat) =>
        cat.id === id
          ? { ...cat, isActive: !cat.isActive, updatedAt: new Date() }
          : cat,
      );

      this.saveCategories(categories);

      const updatedCategory = categories.find((cat) => cat.id === id);
      if (updatedCategory) {
        observer.next(updatedCategory);
      }
      observer.complete();
    });
  }

  // Get available icons for categories
  getAvailableIcons(): string[] {
    return [
      'pi-shopping-bag',
      'pi-play-circle',
      'pi-car',
      'pi-home',
      'pi-heart',
      'pi-shopping-cart',
      'pi-book',
      'pi-money-bill',
      'pi-briefcase',
      'pi-chart-line',
      'pi-coffee',
      'pi-mobile',
      'pi-camera',
      'pi-plane',
      'pi-gift',
      'pi-palette',
      'pi-wrench',
      'pi-globe',
      'pi-star',
      'pi-bolt',
      'pi-shield',
      'pi-sun',
      'pi-moon',
      'pi-wifi',
      'pi-print',
    ];
  }

  // Get available colors for categories
  getAvailableColors(): string[] {
    return [
      '#ef4444',
      '#f97316',
      '#f59e0b',
      '#eab308',
      '#84cc16',
      '#22c55e',
      '#10b981',
      '#14b8a6',
      '#06b6d4',
      '#0ea5e9',
      '#3b82f6',
      '#6366f1',
      '#8b5cf6',
      '#a855f7',
      '#d946ef',
      '#ec4899',
      '#f43f5e',
      '#6b7280',
      '#374151',
      '#1f2937',
    ];
  }
}
