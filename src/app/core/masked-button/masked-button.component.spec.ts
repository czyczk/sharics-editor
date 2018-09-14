import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskedButtonComponent } from './masked-button.component';

describe('MaskedButtonComponent', () => {
  let component: MaskedButtonComponent;
  let fixture: ComponentFixture<MaskedButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskedButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
