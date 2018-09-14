import { Component, OnInit } from '@angular/core';
import {BrowserDetector} from '../../../util/browser-detector';
import {PlaybackService} from '../../../service/playback/playback.service';
import {FileService} from '../../../service/file/file.service';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestAPIComponent implements OnInit {

  timestamp: number;
  browser: string;

  constructor(private playbackService$: PlaybackService,
              private fileService: FileService) { }

  getTimestamp() {
    this.playbackService$.getTimestamp().subscribe(it => this.timestamp = it);
  }

  playOrPause() {
    this.playbackService$.playOrPause().subscribe();
  }

  saveLyricsToFile() {
    this.fileService.saveLyricsToFile();
  }

  detectBrowser() {
    if (BrowserDetector.isEdge()) {
      this.browser = 'edge';
    } else if (BrowserDetector.isFirefox()) {
      this.browser = 'firefox';
    } else if (BrowserDetector.isBlink()) {
      this.browser = 'blink';
    }
  }

  ngOnInit() {
  }

}
