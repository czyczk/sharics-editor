import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {AppSettings} from '../../shared/app-settings';
import {GeneralResponse} from '../../shared/response/general-response';
import {HttpClient} from '@angular/common/http';
import {AppSettingsService} from '../app-settings/app-settings.service';
import {ApiService} from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService extends ApiService implements OnDestroy {
  constructor(http: HttpClient, appSettingsService: AppSettingsService) {
    super(http, appSettingsService);
  }

  // private _httpOptions = {
  //   headers: new HttpHeaders({
  //     'X-PINGOTHER': 'pingpong'
  //   })
  // };

  hello(): Observable<GeneralResponse<string>> {
    return this.http.get<GeneralResponse<string>>(super.prefixUrlWithBase('/hello'));
  }

  getTimestamp(): Observable<GeneralResponse<number>> {
    return this.http.get<GeneralResponse<number>>(super.prefixUrlWithBase('/playback/timestamp'));
  }

  getTrackLength(): Observable<GeneralResponse<number>> {
    return this.http.get<GeneralResponse<number>>(super.prefixUrlWithBase('/playback/length'));
  }

  getPlaybackState(): Observable<GeneralResponse<'idle' | 'playing' | 'paused'>> {
    return this.http.get<GeneralResponse<'idle' | 'playing' | 'paused'>>(super.prefixUrlWithBase('/playback/state'));
  }

  playPreviousTrack(): Observable<any> {
    return this.http.post<any>(super.prefixUrlWithBase('/playback/previous'), null);
  }

  playOrPause(): Observable<any> {
    return this.http.post(super.prefixUrlWithBase('/playback/play-pause'), null);
  }

  stop(): Observable<any> {
    return this.http.post(super.prefixUrlWithBase('/playback/stop'), null);
  }

  playNextTrack(): Observable<any> {
    return this.http.post<any>(super.prefixUrlWithBase('/playback/next'), null);
  }

  /**
   * Seek to a position in track in seconds.
   * @param position Position in seconds.
   */
  seek(position: number): Observable<any> {
    return this.http.post<any>(super.prefixUrlWithBase('/playback/seek'), { position: position });
  }

  /**
   * Seek to a position in track forward by a positive value or backward by a negative value.
   * @param delta Delta in seconds.
   */
  seekDelta(delta: number): Observable<any> {
    return this.http.post<any>(super.prefixUrlWithBase('/playback/seek-delta'), { delta: delta });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
