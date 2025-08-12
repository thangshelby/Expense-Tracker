import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAlert } from './finance-alert';

describe('FinanceAlert', () => {
  let component: FinanceAlert;
  let fixture: ComponentFixture<FinanceAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceAlert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
