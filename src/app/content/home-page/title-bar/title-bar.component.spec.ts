import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TItleBarComponent } from './title-bar.component';

describe('TItleBarComponent', () => {
  let component: TItleBarComponent;
  let fixture: ComponentFixture<TItleBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TItleBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TItleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
