import { Component } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  ActivatedRoute,
  Router,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-welcome',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  currentChildRoute: string | undefined;
  appVersion = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.appVersion = 'v.1.2.0';
    this.router.events.subscribe(() => {
      const child = this.route.firstChild;
      this.currentChildRoute = child?.snapshot.routeConfig?.path;
    });
  }

  isLogging = false;
  onGithub() {}
  onLinkedin() {}
}
