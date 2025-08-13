import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleAlert } from './rule-alert';

describe('RuleAlert', () => {
  let component: RuleAlert;
  let fixture: ComponentFixture<RuleAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuleAlert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
