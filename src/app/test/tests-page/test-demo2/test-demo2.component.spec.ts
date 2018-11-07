import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDemo2Component } from './test-demo2.component';

describe('TestDemo2Component', () => {
  let component: TestDemo2Component;
  let fixture: ComponentFixture<TestDemo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDemo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDemo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
