import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { TransactionType } from '../../shared/types/type';
import { mockTransactions } from '../../core/constants/transactions';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  private transactionSubject = new BehaviorSubject<TransactionType[]>(
    mockTransactions,
  );
  private transactions$ = this.transactionSubject.asObservable();

  getTransactions(): Observable<TransactionType[]> {
    return this.http.get<TransactionType[]>(`${this.baseUrl}`);
  }

  addTransaction(newTransaction: TransactionType): Observable<TransactionType> {
    console.log(newTransaction);
    return this.http.post<TransactionType>(`${this.baseUrl}`, newTransaction);
  }

  updateTransaction(updated: TransactionType): void {
    const current = this.transactionSubject.getValue();
    const index = current.findIndex((t) => t.id === updated.id);
    if (index !== -1) {
      current[index] = { ...current[index], ...updated };
      this.transactionSubject.next([...current]);
    }
  }

  deleteTransaction(id: string): void {
    const current = this.transactionSubject.getValue();
    const updatedList = current.filter((t) => t.id !== id);
    this.transactionSubject.next(updatedList);
  }
}
