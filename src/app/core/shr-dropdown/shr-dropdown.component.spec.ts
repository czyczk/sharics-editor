import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShrDropdownComponent } from './shr-dropdown.component';

describe('ShrDropdownComponent', () => {
  let component: ShrDropdownComponent;
  let fixture: ComponentFixture<ShrDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShrDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShrDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
