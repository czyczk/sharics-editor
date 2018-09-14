import { TestBed } from '@angular/core/testing';

import { PlaybackControlStateService } from './playback-control-state.service';

describe('PlaybackControlStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaybackControlStateService = TestBed.get(PlaybackControlStateService);
    expect(service).toBeTruthy();
  });
});
