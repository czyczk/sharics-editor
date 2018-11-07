import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskedInputDeprecatedComponent } from './masked-input-deprecated.component';

describe('MaskedInputComponent', () => {
  let component: MaskedInputDeprecatedComponent;
  let fixture: ComponentFixture<MaskedInputDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskedInputDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskedInputDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
