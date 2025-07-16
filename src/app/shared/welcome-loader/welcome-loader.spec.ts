import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLoader } from './welcome-loader';

describe('WelcomeLoader', () => {
  let component: WelcomeLoader;
  let fixture: ComponentFixture<WelcomeLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
