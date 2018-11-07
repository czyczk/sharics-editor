import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicBarDeprecatedComponent } from './dynamic-bar-deprecated.component';

describe('DynamicBarComponent', () => {
  let component: DynamicBarDeprecatedComponent;
  let fixture: ComponentFixture<DynamicBarDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicBarDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicBarDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
