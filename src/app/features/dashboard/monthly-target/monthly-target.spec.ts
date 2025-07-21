import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTarget } from './monthly-target';

describe('MonthlyTarget', () => {
  let component: MonthlyTarget;
  let fixture: ComponentFixture<MonthlyTarget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyTarget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyTarget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
