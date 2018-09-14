import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptiveImgComponent } from './adaptive-img.component';

describe('AdaptiveImgComponent', () => {
  let component: AdaptiveImgComponent;
  let fixture: ComponentFixture<AdaptiveImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptiveImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptiveImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
