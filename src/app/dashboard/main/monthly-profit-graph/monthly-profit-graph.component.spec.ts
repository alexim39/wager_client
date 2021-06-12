import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyProfitGraphComponent } from './monthly-profit-graph.component';

describe('MonthlyProfitGraphComponent', () => {
  let component: MonthlyProfitGraphComponent;
  let fixture: ComponentFixture<MonthlyProfitGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyProfitGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyProfitGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
