import {
  ChangeDetectorRef,
  Component,
  HostBinding, OnDestroy,
  OnInit,
} from '@angular/core';
import {PlaybackService} from '../../../../service/playback/playback.service';
import {PlaybackControlStateService} from '../../../../service/playback-control/playback-control-state.service';
import {TranslateService} from '@ngx-translate/core';
import {AppSettingsService} from '../../../../service/app-settings/app-settings.service';
import {AppSettings} from '../../../../shared/app-settings';
import {TimestampUtil} from '../../../../util/timestamp-util';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-playback-control-bar',
  templateUrl: './playback-control-bar.component.html',
  styleUrls: ['./playback-control-bar.component.scss']
})
export class PlaybackControlBarComponent implements OnInit, OnDestroy {

  constructor(private appSettingsService: AppSettingsService,
              private playbackService$: PlaybackService,
              private playbackControlStateService: PlaybackControlStateService,
              private translateService: TranslateService,
              private cd: ChangeDetectorRef) {
    // Load global app settings
    this.subscriptions.push(appSettingsService.appSettings.subscribe(it => {
      this.appSettings = it;
      // Apply related locale settings
      translateService.setDefaultLang(AppSettings.LocaleSettings.localeFallback);
      translateService.use(it.localeSettings.locale);
    }));

    // Load component state
    this.subscriptions.push(playbackControlStateService.isConnected.subscribe(it => {
      this._isConnected = it;
    }));
    this.subscriptions.push(playbackControlStateService.temp.subscribe(it => {
      this._temp = it; // for testing purpose only
    }));
    this.subscriptions.push(playbackControlStateService.playbackState.subscribe(it => {
      this._playbackState = it;
      this.onPlaybackStateChanged(it);
    }));

    // Try to connect to server if not
    if (!this.isConnected) {
      this.connectToServer();
    }
  }

  componentName = 'playback-control-bar';
  subscriptions: Subscription[] = [];

  // Global settings. Do not modify data inside.
  private appSettings: AppSettings;

  // For the button "Connect to server"
  btnCtsState: 'default' | 'operating' | 'on-failure' = 'default';

  // For playback control buttons
  btnPlaybackControlsSize = '2.5rem';

  // For playback position
  playbackPosition: string;
  playbackPositionIntervalId: number;
  trackLength: string;

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%';

  // Whether the control bar is connected with the server
  private _isConnected: boolean;
  get isConnected(): boolean {
    return this._isConnected;
  }
  set isConnected(val: boolean) {
    if (val !== this._isConnected) {
      this.playbackControlStateService.isConnected.next(val);
    }
  }

  // For testing purpose only
  private _temp: number;
  get temp(): number {
    return this._temp;
  }
  set temp(val: number) {
    if (this._temp !== val) {
      this.playbackControlStateService.temp.next(val);
    }
  }

  // Playback state. Either 'idle', 'playing' or 'paused'.
  private _playbackState: 'idle' | 'playing' | 'paused';
  get playbackState(): 'idle' | 'playing' | 'paused' {
    return this._playbackState;
  }
  set playbackState(val: 'idle' | 'playing' | 'paused') {
    if (this._playbackState !== val) {
      this.playbackControlStateService.playbackState.next(val);
    }
  }
  private onPlaybackStateChanged(val: 'idle' | 'playing' | 'paused') {
    // Clear the previous playback position interval
    if (this.playbackPositionIntervalId) {
      clearInterval(this.playbackPositionIntervalId);
    }
    // If the playback is active, update track length (300ms after playback is started) and clear the previous playback position interval
    if (val === 'playing' || val === 'paused') {
      setTimeout(() => {
        this.updateTrackLength();
      }, 300);
      if (val === 'playing') {
        // If it's playing, update playback position every 200ms.
        this.playbackPositionIntervalId = setInterval(() => {
          this.updatePlaybackPosition();
        }, 200);
      } else if (val === 'paused') {
        // If the panel is switched back when paused, this extra request is necessary
        this.updatePlaybackPosition();
      }
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.playbackPositionIntervalId) {
      clearInterval(this.playbackPositionIntervalId);
    }
    this.subscriptions.forEach(it => {
      it.unsubscribe();
    });
  }

  connectToServer() {
    // On click, change the instructional text and disable the button
    this.btnCtsState = 'operating';
    // Say hello to the server
    this.playbackService$.hello().subscribe(it => {
      // If the server responses, enable the button and restore the text
      this.btnCtsState = 'default';
      // Set `isConnected` to `true`
      this.isConnected = true;
      // Update playback state
      this.updatePlaybackState();
    }, err => {
      // On error, show the failure text for a moment, restore the text and enable the button
      console.error(err);
      this.btnCtsState = 'on-failure';
      setTimeout(() => {
        this.btnCtsState = 'default';
      }, 2000);
    });
  }

  updatePlaybackState() {
    this.playbackService$.getPlaybackState().subscribe(it => {
      this.playbackState = it.msg;
      // By default, the change detection will be invoked only when the value is different.
      // But for playback state, it should be invoked whenever the change is.
      if (this._playbackState === it.msg) {
        this.onPlaybackStateChanged(it.msg);
      }
    }, err => {
      this.handleError(err);
    });
  }

  updatePlaybackPosition() {
    this.playbackService$.getTimestamp().subscribe(it => {
      this.playbackPosition = TimestampUtil.formatDisplay(it.msg);
    }, err => {
      this.handleError(err);
    });
  }

  updateTrackLength() {
    this.playbackService$.getTrackLength().subscribe(it => {
      console.log('track length:');
      console.log(it.msg);
      this.trackLength = TimestampUtil.formatDisplay(it.msg);
    }, err => {
      this.handleError(err);
    });
  }

  playPreviousTrack() {
    this.playbackService$.playPreviousTrack().subscribe(() => {
      setTimeout(() => {
        this.updatePlaybackState();
      }, 200);
    }, err => {
      this.handleError(err);
    });
  }

  playOrPause() {
    this.playbackService$.playOrPause().subscribe(() => {
      if (this.playbackState === 'playing') {
        this.playbackState = 'paused';
      } else {
        this.playbackState = 'playing';
      }
    },
      err => {
      this.handleError(err);
      });
  }

  stop() {
    // Do nothing if it's idle
    if (this.playbackState === 'idle') {
      return;
    }
    this.playbackService$.stop().subscribe(() => {
      // State = 'idle'
      this.playbackState = 'idle';
    }, err => {
      this.handleError(err);
    });
  }

  playNextTrack() {
    this.playbackService$.playNextTrack().subscribe(() => {
      setTimeout(() => {
        this.updatePlaybackState();
      }, 200);
    }, err => {
      this.handleError(err);
    });
  }

  private handleError(err) {
    console.error(err);
    if (this.playbackPositionIntervalId) {
      clearInterval(this.playbackPositionIntervalId);
    }
    this.isConnected = false;
  }
}
