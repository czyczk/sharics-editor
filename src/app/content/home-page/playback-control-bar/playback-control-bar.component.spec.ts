import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackControlBarComponent } from './playback-control-bar.component';

describe('PlaybackControlBarComponent', () => {
  let component: PlaybackControlBarComponent;
  let fixture: ComponentFixture<PlaybackControlBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybackControlBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybackControlBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
