import { Component, OnInit, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-custom-inputgroup',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    CommonModule,
  ],
  templateUrl: './custom-inputgroup.html',
})
export class CustomInputGroup {}
