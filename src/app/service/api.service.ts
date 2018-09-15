import {Injectable, OnDestroy} from '@angular/core';
import {AppSettingsService} from './app-settings/app-settings.service';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../shared/app-settings';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {
  private appSettings: AppSettings;
  private appSettingsSubscription: Subscription;

  constructor(protected http: HttpClient, private appSettingsService: AppSettingsService) {
    this.appSettingsSubscription = this.appSettingsService.appSettings.subscribe(it => {
      this.appSettings = it;
    });
  }

  ngOnDestroy() {
    console.log('on ApiService destroyed');
    this.appSettingsSubscription.unsubscribe();
  }

  protected prefixUrlWithBase(url: string): string {
    const host = `http://${this.appSettings.networkSettings.hostIp}:${this.appSettings.networkSettings.port}`;
    return host + AppSettings.NetworkSettings.apiBase + url;
  }
}
