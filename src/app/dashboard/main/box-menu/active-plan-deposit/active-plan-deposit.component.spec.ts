import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePlanDepositComponent } from './active-plan-deposit.component';

describe('ActivePlanDepositComponent', () => {
  let component: ActivePlanDepositComponent;
  let fixture: ComponentFixture<ActivePlanDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePlanDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePlanDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
