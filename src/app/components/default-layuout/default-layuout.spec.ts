import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayuout } from './default-layuout';

describe('DefaultLayuout', () => {
  let component: DefaultLayuout;
  let fixture: ComponentFixture<DefaultLayuout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultLayuout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultLayuout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
