import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskedButtonDeprecatedComponent } from './masked-button-deprecated.component';

describe('MaskedButtonComponent', () => {
  let component: MaskedButtonDeprecatedComponent;
  let fixture: ComponentFixture<MaskedButtonDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskedButtonDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskedButtonDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
