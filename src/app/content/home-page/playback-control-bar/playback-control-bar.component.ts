import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppSettingsService} from '../../../service/app-settings/app-settings.service';
import {PlaybackService} from '../../../service/playback/playback.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {AppSettings} from '../../../shared/app-settings';
import Timeout = NodeJS.Timeout;
import {KeymapUtil} from '../../../util/keymap-util';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {PlaybackPosition} from '../../../shared/playback-position';
import {PlaybackControlStateService} from '../../../service/playback-control/playback-control-state.service';
import {TrackService} from '../../../service/track/track.service';

@Component({
  selector: 'app-playback-control-bar',
  templateUrl: './playback-control-bar.component.html',
  styleUrls: ['./playback-control-bar.component.scss']
})
export class PlaybackControlBarComponent implements OnInit, OnDestroy {

  constructor(private appSettingsService: AppSettingsService,
              private playbackService$: PlaybackService,
              private trackService$: TrackService,
              private playbackControlStateService: PlaybackControlStateService,
              private translateService: TranslateService,
              private toastrService: ToastrService) {
    // Load global app settings
    this.subscriptions.push(appSettingsService.appSettings.subscribe(it => {
      this.appSettings = it;
      // Apply related locale settings
      translateService.setDefaultLang(AppSettings.LocaleSettings.localeFallback);
      translateService.use(it.localeSettings.locale);
    }));

    // Load component state
    // 1. Bind "isConnected"
    this.subscriptions.push(playbackControlStateService.isConnected.subscribe(it => {
      this._isConnected = it;
    }));
    // 2. Bind "playbackState" and a callback for changing values
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

  // The container to display the toast
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  @ViewChild('positionSlider') positionSlider: HTMLInputElement;

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

  // For the button "Connect to server"
  // Actually, the state of "on-failure" is not used in the current version
  btnCtsState: 'default' | 'operating' | 'on-failure' = 'default';

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

  // Title
  title: string;

  // For playback position
  isSeeking = false;
  playbackPosition: PlaybackPosition;
  trackLength: PlaybackPosition;
  playbackPositionInterval: Timeout;
  private _playbackPositionPercentage = 0;
  get playbackPositionPercentage(): number {
    if (this.isSeeking) {
      return this.positionSlider.valueAsNumber;
    }
    if (!this.isSeeking && this.playbackPosition && this.trackLength) {
      this._playbackPositionPercentage = this.playbackPosition.position / this.trackLength.position;
    } else if (!this.playbackPosition || !this.trackLength) {
      this._playbackPositionPercentage = 0;
    }
    return this._playbackPositionPercentage;
  }

  /**
   * Try to connect to server.
   */
  connectToServer() {
    // On click, disable the button
    this.btnCtsState = 'operating';
    // Say hello to the server
    this.playbackService$.hello().subscribe(it => {
      // If the server responses, enable the button
      this.btnCtsState = 'default';
      // Set `isConnected` to `true`
      this.isConnected = true;
      // Update playback state
      this.updatePlaybackState();
    }, async err => {
      // On error, show the failure toast for a moment, re-enable the button
      console.error(err);

      const errorMessage = await this.translateService.get(`${this.componentName}.toast.unable-to-connect`).toPromise();
      this.toastrService.error(errorMessage, null, {
        timeOut: 1500,
        extendedTimeOut: 100,
      });

      this.btnCtsState = 'default';
    });
  }

  /**
   * Request the server for the current playback state.
   */
  updatePlaybackState() {
    this.playbackService$.getPlaybackState().subscribe(it => {
      this.playbackState = it.msg;
      // By default, the change detection will be invoked only when the value is different.
      // For the playback state, further updates should be invoked no matter it's changed or not.
      if (this._playbackState === it.msg) {
        this.onPlaybackStateChanged(it.msg);
      }
    }, err => {
      this.handleError(err);
    });
  }

  /**
   * Request the server to format a title and update it in the bar.
   */
  updateTitle() {
    this.trackService$.formatTitle(this.appSettings.titleFormatting.playbackControlBarFormat).subscribe(it => {
      this.title = it.msg;
    });
  }

  /**
   * Request the server for the current playback position.
   */
  updatePlaybackPosition() {
    this.playbackService$.getTimestamp().subscribe(it => {
      this.playbackPosition = new PlaybackPosition(it.msg);
    }, err => {
      this.handleError(err);
    });
  }

  /**
   * Request the server for the length of the track.
   */
  updateTrackLength() {
    this.playbackService$.getTrackLength().subscribe(it => {
      console.log('track length:');
      console.log(it.msg);
      this.trackLength = new PlaybackPosition(it.msg);
    }, err => {
      this.handleError(err);
    });
  }

  /**
   * Request the server to play the previous track.
   */
  playPreviousTrack() {
    this.playbackService$.playPreviousTrack().subscribe(() => {
      setTimeout(() => {
        this.updatePlaybackState();
      }, 200);
    }, err => {
      this.handleError(err);
    });
  }

  /**
   * Request the server to play or pause.
   */
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

  /**
   * Request the server to stop.
   */
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

  /**
   * Request the server to play the next track.
   */
  playNextTrack() {
    this.playbackService$.playNextTrack().subscribe(() => {
      setTimeout(() => {
        this.updatePlaybackState();
      }, 200);
    }, err => {
      this.handleError(err);
    });
  }

  /**
   * Request the server to seek to the specified position of the track.
   * @param percentage The percentage of the track length
   */
  seekInTrack(percentage: number) {
    // While seeking, stop updating playback position slider temporarily
    this.isSeeking = true;

    this.playbackService$.seek(percentage * this.trackLength.position).subscribe(() => {
      // On success, update the playback position and resume updating the slider
      this.playbackService$.getTimestamp().subscribe(it => {
        this.isSeeking = false;
        this.playbackPosition = new PlaybackPosition(it.msg);
      });
    }, err => {
      this.handleError(err);
      // Resume updating the slider
      this.isSeeking = false;
    });
  }

  // Actions to take when the playback state changes.
  private onPlaybackStateChanged(val: 'idle' | 'playing' | 'paused') {
    // Clear the previous playback position interval
    if (this.playbackPositionInterval) {
      clearInterval(this.playbackPositionInterval);
    }
    // If the playback is active
    // 1. Update title formatting (300ms after playback has started)
    // 2. Update track length (300ms after playback has started) and clear the previous playback position interval
    // (The latency may has something to do with a bug in the player...)
    if (val === 'playing' || val === 'paused') {
      setTimeout(() => {
        this.updateTitle();
        this.updateTrackLength();
      }, 300);
      if (val === 'playing') {
        // If it's playing, update playback position every 200ms.
        this.playbackPositionInterval = setInterval(() => {
          this.updatePlaybackPosition();
        }, 200);
      } else if (val === 'paused') {
        // If the panel is switched back when paused, this extra request is necessary
        this.updatePlaybackPosition();
      }
    }
    // If the playback stops, clear the title to make sure there's no potential risk to catch sight of the previous title
    else {
      this.title = null;
    }
  }

  private handleError(err) {
    console.error(err);
    if (this.playbackPositionInterval) {
      clearInterval(this.playbackPositionInterval);
    }
    this.isConnected = false;
  }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
  }

  ngOnDestroy() {
    if (this.playbackPositionInterval) {
      clearInterval(this.playbackPositionInterval);
    }
    this.subscriptions.forEach(it => {
      it.unsubscribe();
    });
  }

  @HostListener('window:keydown', ['$event']) keymap(event: KeyboardEvent) {
    const keymap = this.appSettings.playbackControlKeymap;
    const targetShortcutStr = KeymapUtil.toKeyShortcut(event).toString();
    if (!this.isConnected) {
      return;
    }

    if (keymap.playOrPause.toStringArr().includes(targetShortcutStr)) {
      event.preventDefault();
      this.playOrPause();
    } else if (keymap.stop.toStringArr().includes(targetShortcutStr)) {
      event.preventDefault();
      this.stop();
    } else if (keymap.playPreviousTrack.toStringArr().includes(targetShortcutStr)) {
      event.preventDefault();
      this.playPreviousTrack();
    } else if (keymap.playNextTrack.toStringArr().includes(targetShortcutStr)) {
      event.preventDefault();
      this.playNextTrack();
    }
  }

}
