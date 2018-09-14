import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AppSettingsService} from '../app-settings/app-settings.service';
import {AppSettings} from '../../shared/app-settings';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService implements OnInit {
  constructor(private _http: HttpClient, private appSettingsService: AppSettingsService) { }

  // private _httpOptions = {
  //   headers: new HttpHeaders({
  //     'X-PINGOTHER': 'pingpong'
  //   })
  // };

  private appSettings: AppSettings;

  ngOnInit() {
    this.appSettingsService.appSettings.subscribe(it => {
      this.appSettings = it;
    });
  }


  hello(): Observable<string> {
    return this._http.get<string>(`http://localhost:27636/api/v1/hello`);
  }

  getTimestamp(): Observable<number> {
    return this._http.get<number>(`http://localhost:27636/api/v1/playback/timestamp`);
  }

  playOrPause(): Observable<any> {
    // return this._http.post(`http://localhost:27636/api/v1/playback/play-pause`, null, this._httpOptions);
    return this._http.post(`http://localhost:27636/api/v1/playback/play-pause`, null);
  }

}
