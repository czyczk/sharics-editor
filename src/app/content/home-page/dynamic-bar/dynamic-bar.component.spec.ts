import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicBarComponent } from './dynamic-bar.component';

describe('DynamicBarComponent', () => {
  let component: DynamicBarComponent;
  let fixture: ComponentFixture<DynamicBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
