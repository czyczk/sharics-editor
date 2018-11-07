import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskedContainerDeprecatedComponent } from './masked-container-deprecated.component';

describe('MaskedContainerComponent', () => {
  let component: MaskedContainerDeprecatedComponent;
  let fixture: ComponentFixture<MaskedContainerDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskedContainerDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskedContainerDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
