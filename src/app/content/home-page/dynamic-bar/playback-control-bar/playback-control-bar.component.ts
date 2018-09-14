import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import {PlaybackService} from '../../../../service/playback/playback.service';
import {PlaybackControlStateService} from '../../../../service/playback-control/playback-control-state.service';

@Component({
  selector: 'app-playback-control-bar',
  templateUrl: './playback-control-bar.component.html',
  styleUrls: ['./playback-control-bar.component.scss']
})
export class PlaybackControlBarComponent implements OnInit {

  constructor(private playbackService$: PlaybackService,
              private playbackControlStateService: PlaybackControlStateService,
              private cd: ChangeDetectorRef) {
    playbackControlStateService.isConnected.subscribe(it => {
      this._isConnected = it;
    });
    playbackControlStateService.temp.subscribe(it => {
      this._temp = it;
    });
  }

  private _isConnected: boolean;
  get isConnected(): boolean {
    return this._isConnected;
  }
  set isConnected(val: boolean) {
    if (val !== this._isConnected) {
      this.playbackControlStateService.isConnected.next(val);
    }
  }

  private _temp: number;
  get temp(): number {
    return this._temp;
  }
  set temp(val: number) {
    if (this._temp !== val) {
      this.playbackControlStateService.temp.next(val);
    }
  }

  // For the button "Connect to server"
  private btnCtsDefaultText = 'Connect to server';
  private btnCtsOperating = 'Connecting...';
  private btnCtsOnFailure = 'Failed';
  btnCtsText = this.btnCtsDefaultText;
  btnCtsDisabled = false;

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%';

  connectToServer() {
    // On click, change the instructional text and disable the button
    this.btnCtsText = this.btnCtsOperating;
    this.btnCtsDisabled = true;
    // Say hello to the server
    this.playbackService$.hello().subscribe(it => {
      // If the server responses, enable the button and restore the text
      this.btnCtsText = this.btnCtsDefaultText;
      this.btnCtsDisabled = false;
    }, err => {
      // On error, show the failure text for a moment, restore the text and enable the button
      console.error(err);
      this.btnCtsText = this.btnCtsOnFailure;
      setTimeout(() => {
        this.btnCtsText = this.btnCtsDefaultText;
        this.btnCtsDisabled = false;
      }, 2000);
    });
  }

  ngOnInit() {
  }

  incrTemp() {
    this.temp++;
  }
}
