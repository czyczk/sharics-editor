import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AppSettingsService} from '../../../../service/app-settings/app-settings.service';
import {Subscription} from 'rxjs';
import {AppSettings} from '../../../../shared/app-settings';

@Component({
  selector: 'app-sidebar-normal',
  templateUrl: './sidebar-normal.component.html',
  styleUrls: ['./sidebar-normal.component.scss']
})
export class SidebarNormalComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private appSettingsService: AppSettingsService,
              private translateService: TranslateService) {
    // Load global app settings
    this.subscriptions.push(appSettingsService.appSettings.subscribe(it => {
      this.appSettings = it;
      // Apply related locale settings
      translateService.setDefaultLang(AppSettings.LocaleSettings.localeFallback);
      translateService.use(it.localeSettings.locale);
    }));
  }

  componentName = 'sidebar-normal';

  private subscriptions: Subscription[] = [];
  private appSettings: AppSettings;

  ngOnInit() { }

  ngOnDestroy() {
    this.subscriptions.forEach(it => it.unsubscribe());
  }

  navToSettings() {
    this.router.navigateByUrl('/settings');
  }

}
