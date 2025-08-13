import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAlert } from './settings-alert';

describe('SettingsAlert', () => {
  let component: SettingsAlert;
  let fixture: ComponentFixture<SettingsAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsAlert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
