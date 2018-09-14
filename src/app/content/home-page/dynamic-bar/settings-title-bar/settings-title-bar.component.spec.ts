import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTitleBarComponent } from './settings-title-bar.component';

describe('SettingsTitleBarComponent', () => {
  let component: SettingsTitleBarComponent;
  let fixture: ComponentFixture<SettingsTitleBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsTitleBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
