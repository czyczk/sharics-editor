import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSettingsDeprecatedComponent } from './sidebar-settings-deprecated.component';

describe('SidebarSettingsComponent', () => {
  let component: SidebarSettingsDeprecatedComponent;
  let fixture: ComponentFixture<SidebarSettingsDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarSettingsDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSettingsDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
