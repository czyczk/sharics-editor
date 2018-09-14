import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBackgroundMaskComponent } from './test-background-mask.component';

describe('TestBackgroundMaskComponent', () => {
  let component: TestBackgroundMaskComponent;
  let fixture: ComponentFixture<TestBackgroundMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBackgroundMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBackgroundMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
