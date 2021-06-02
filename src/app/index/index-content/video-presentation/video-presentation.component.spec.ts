import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPresentationComponent } from './video-presentation.component';

describe('VideoPresentationComponent', () => {
  let component: VideoPresentationComponent;
  let fixture: ComponentFixture<VideoPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
