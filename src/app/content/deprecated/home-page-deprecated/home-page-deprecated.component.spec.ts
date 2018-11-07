import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageDeprecatedComponent } from './home-page-deprecated.component';

describe('HomePageComponent', () => {
  let component: HomePageDeprecatedComponent;
  let fixture: ComponentFixture<HomePageDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
