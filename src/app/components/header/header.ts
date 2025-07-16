import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() sidenavRef!: MatSidenav;

  onToggleSidenav() {
    this.sidenavRef.toggle();
  }
  onLogout() {}
}
