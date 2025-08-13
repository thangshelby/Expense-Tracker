import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAlert } from './history-alert';

describe('HistoryAlert', () => {
  let component: HistoryAlert;
  let fixture: ComponentFixture<HistoryAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryAlert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
