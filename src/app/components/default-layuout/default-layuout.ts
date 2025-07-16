import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { SideNavbar } from '../side-navbar/side-navbar';

@Component({
  selector: 'app-default-layuout',
  imports: [RouterOutlet, MatSidenavModule, Header, SideNavbar],
  templateUrl: './default-layuout.html',
  styleUrl: './default-layuout.css',
})
export class DefaultLayout {}
