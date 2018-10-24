import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMaskedButtonComponent } from './test-masked-button.component';

describe('TestMaskedButtonComponent', () => {
  let component: TestMaskedButtonComponent;
  let fixture: ComponentFixture<TestMaskedButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMaskedButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMaskedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
