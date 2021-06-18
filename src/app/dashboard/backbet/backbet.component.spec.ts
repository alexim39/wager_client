import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackbetComponent } from './backbet.component';

describe('BackbetComponent', () => {
  let component: BackbetComponent;
  let fixture: ComponentFixture<BackbetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackbetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackbetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
