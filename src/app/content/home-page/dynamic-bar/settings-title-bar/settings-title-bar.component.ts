import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppSettingsService} from '../../../../service/app-settings/app-settings.service';
import {Subscription} from 'rxjs';
import {AppSettings} from '../../../../shared/app-settings';

@Component({
  selector: 'app-settings-title-bar',
  templateUrl: './settings-title-bar.component.html',
  styleUrls: ['./settings-title-bar.component.scss']
})
export class SettingsTitleBarComponent implements OnInit, OnDestroy {

  constructor(private appSettingsService: AppSettingsService,
              private translateService: TranslateService) {
    // Load global app settings
    this.subscriptions.push(appSettingsService.appSettings.subscribe(it => {
      this.appSettings = it;
      // Apply related locale settings
      translateService.setDefaultLang(AppSettings.LocaleSettings.localeFallback);
      translateService.use(it.localeSettings.locale);
    }));
  }

  private subscriptions: Subscription[] = [];
  private appSettings: AppSettings;

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(it => it.unsubscribe());
  }

}
