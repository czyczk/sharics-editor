import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackControlBarDeprecatedComponent } from './playback-control-bar-deprecated.component';

describe('PlaybackControlBarComponent', () => {
  let component: PlaybackControlBarDeprecatedComponent;
  let fixture: ComponentFixture<PlaybackControlBarDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybackControlBarDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybackControlBarDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
