import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import {PlaybackService} from '../../../../service/playback/playback.service';
import {PlaybackControlStateService} from '../../../../service/playback-control/playback-control-state.service';
import {TranslateService} from '@ngx-translate/core';
import {AppSettingsService} from '../../../../service/app-settings/app-settings.service';
import {AppSettings} from '../../../../shared/app-settings';

@Component({
  selector: 'app-playback-control-bar',
  templateUrl: './playback-control-bar.component.html',
  styleUrls: ['./playback-control-bar.component.scss']
})
export class PlaybackControlBarComponent implements OnInit {

  constructor(private appSettingsService: AppSettingsService,
              private playbackService$: PlaybackService,
              private playbackControlStateService: PlaybackControlStateService,
              private translateService: TranslateService,
              private cd: ChangeDetectorRef) {
    // Load global app settings
    appSettingsService.appSettings.subscribe(it => {
      this.appSettings = it;
      // Apply related locale settings
      translateService.setDefaultLang(AppSettings.LocaleSettings.localeFallback);
      translateService.use(it.localeSettings.locale);
    });

    // Load component state
    playbackControlStateService.isConnected.subscribe(it => {
      this._isConnected = it;
    });
    playbackControlStateService.temp.subscribe(it => {
      this._temp = it; // for testing purpose only
    });
    playbackControlStateService.playbackState.subscribe(it => {
      this._playbackState = it;
    });
  }

  componentName = 'playback-control-bar';

  // Global settings. Do not modify data inside.
  private appSettings: AppSettings;

  // For the button "Connect to server"
  btnCtsState: 'default' | 'operating' | 'on-failure' = 'default';

  // For playback control buttons
  btnPlaybackControlsSize = '2.5rem';

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

  connectToServer() {
    // On click, change the instructional text and disable the button
    this.btnCtsState = 'operating';
    // Say hello to the server
    this.playbackService$.hello().subscribe(it => {
      // If the server responses, enable the button and restore the text
      this.btnCtsState = 'default';
      // Set `isConnected` to `true`
      this.isConnected = true;
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
    });
  }

  playPreviousTrack() {
    this.playbackService$.playPreviousTrack().subscribe(() => {
      setTimeout(() => {
        this.updatePlaybackState();
      }, 200);
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
    });
  }

  private handleError(err) {
    console.error(err);
  }

  ngOnInit() {
  }
}
