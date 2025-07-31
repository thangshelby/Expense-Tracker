import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { TransactionType } from '../../types/type';
import { mockTransactions } from '../../constants/transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionSubject = new BehaviorSubject<TransactionType[]>(
    mockTransactions,
  );
  private transactions$ = this.transactionSubject.asObservable();

  getTransactions(): Observable<TransactionType[]> {
    return this.transactions$;
  }

  addTransaction(transaction: TransactionType): void {
    const current = this.transactionSubject.getValue();
    this.transactionSubject.next([...current, transaction]);
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
