import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingWidrawalComponent } from './pending-widrawal.component';

describe('PendingWidrawalComponent', () => {
  let component: PendingWidrawalComponent;
  let fixture: ComponentFixture<PendingWidrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingWidrawalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingWidrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
