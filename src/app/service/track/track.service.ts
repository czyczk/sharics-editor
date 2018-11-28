import {Injectable, OnDestroy} from '@angular/core';
import {ApiService} from '../api.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppSettingsService} from '../app-settings/app-settings.service';
import {GeneralResponse} from '../../shared/response/general-response';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService extends ApiService implements OnDestroy {

  constructor(http: HttpClient, appSettingsService: AppSettingsService) {
    super(http, appSettingsService);
  }

  formatTitle(format: string): Observable<GeneralResponse<string>> {
    format = encodeURI(format);
    return this.http.get<GeneralResponse<string>>(super.prefixUrlWithBase(`/track/title-formatting/${format}`));
  }

  getCover(type: 'front' | 'back' = 'front'): Observable<Blob> {
    const options = {
      responseType: 'blob' as 'blob'
    };
    return this.http.get(super.prefixUrlWithBase(`/track/cover/${type}`), options);
  }
}
