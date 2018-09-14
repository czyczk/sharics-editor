import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundMaskComponent } from './background-mask.component';

describe('BackgroundMaskComponent', () => {
  let component: BackgroundMaskComponent;
  let fixture: ComponentFixture<BackgroundMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
