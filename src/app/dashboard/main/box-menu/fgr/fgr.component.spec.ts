import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgrComponent } from './fgr.component';

describe('FgrComponent', () => {
  let component: FgrComponent;
  let fixture: ComponentFixture<FgrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FgrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
