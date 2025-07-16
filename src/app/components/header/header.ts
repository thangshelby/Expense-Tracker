import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule],
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
