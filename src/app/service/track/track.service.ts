import {Injectable, OnDestroy} from '@angular/core';
import {ApiService} from '../api.service';
import {HttpClient} from '@angular/common/http';
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
}
