import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAlert } from './current-alert';

describe('CurrentAlert', () => {
  let component: CurrentAlert;
  let fixture: ComponentFixture<CurrentAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAlert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
