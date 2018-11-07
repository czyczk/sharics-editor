import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundMaskDeprecatedComponent } from './background-mask-deprecated.component';

describe('BackgroundMaskComponent', () => {
  let component: BackgroundMaskDeprecatedComponent;
  let fixture: ComponentFixture<BackgroundMaskDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundMaskDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundMaskDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
