import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinoutComponent } from './coinout.component';

describe('CoinoutComponent', () => {
  let component: CoinoutComponent;
  let fixture: ComponentFixture<CoinoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
