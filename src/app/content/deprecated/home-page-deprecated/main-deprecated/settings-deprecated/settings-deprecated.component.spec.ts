import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDeprecatedComponent } from './settings-deprecated.component';

describe('SettingsComponent', () => {
  let component: SettingsDeprecatedComponent;
  let fixture: ComponentFixture<SettingsDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
