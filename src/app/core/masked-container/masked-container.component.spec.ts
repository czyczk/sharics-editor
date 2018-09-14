import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskedContainerComponent } from './masked-container.component';

describe('MaskedContainerComponent', () => {
  let component: MaskedContainerComponent;
  let fixture: ComponentFixture<MaskedContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskedContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
