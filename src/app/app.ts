import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToggleTheme } from './store/theme.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    const isDarkMode = localStorage.getItem('theme') == 'true' ? true : false;
    console.log(isDarkMode);
    if (isDarkMode) {
      this.store.dispatch(new ToggleTheme());
    }
  }
  protected title = 'Expense_Tracker';
}
