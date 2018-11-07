import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTitleBarDeprecatedComponent } from './settings-title-bar-deprecated.component';

describe('SettingsTitleBarComponent', () => {
  let component: SettingsTitleBarDeprecatedComponent;
  let fixture: ComponentFixture<SettingsTitleBarDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsTitleBarDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTitleBarDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
