import { Component } from '@angular/core';
import {PlaybackService} from './service/playback/playback.service';
import {FileService} from './service/file/file.service';
import {BrowserDetector} from './util/browser-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() { }

  title = 'sharics-editor';



}
