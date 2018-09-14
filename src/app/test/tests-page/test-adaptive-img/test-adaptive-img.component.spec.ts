import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAdaptiveImgComponent } from './test-adaptive-img.component';

describe('TestAdaptiveImgComponent', () => {
  let component: TestAdaptiveImgComponent;
  let fixture: ComponentFixture<TestAdaptiveImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAdaptiveImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAdaptiveImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
