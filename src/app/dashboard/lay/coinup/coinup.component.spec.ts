import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinupComponent } from './coinup.component';

describe('CoinupComponent', () => {
  let component: CoinupComponent;
  let fixture: ComponentFixture<CoinupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
