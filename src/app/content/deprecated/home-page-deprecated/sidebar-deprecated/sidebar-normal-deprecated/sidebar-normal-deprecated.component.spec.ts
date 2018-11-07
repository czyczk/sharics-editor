import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNormalDeprecatedComponent } from './sidebar-normal-deprecated.component';

describe('SidebarComponent', () => {
  let component: SidebarNormalDeprecatedComponent;
  let fixture: ComponentFixture<SidebarNormalDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarNormalDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNormalDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
