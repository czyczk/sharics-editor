import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDeprecatedComponent } from './sidebar-deprecated.component';

describe('SidebarComponent', () => {
  let component: SidebarDeprecatedComponent;
  let fixture: ComponentFixture<SidebarDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
