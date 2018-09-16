import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AppSettings} from '../../../../shared/app-settings';
import {AppSettingsService} from '../../../../service/app-settings/app-settings.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-settings',
  templateUrl: './sidebar-settings.component.html',
  styleUrls: ['./sidebar-settings.component.scss']
})
export class SidebarSettingsComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private appSettingsService: AppSettingsService,
              private translateService: TranslateService) {
    // Load global app settings
    this.subscriptions.push(this.appSettingsService.appSettings.subscribe(it => {
      this.appSettings = it;
      // Apply related locale settings
      translateService.setDefaultLang(AppSettings.LocaleSettings.localeFallback);
      translateService.use(it.localeSettings.locale);
    }));
  }

  componentName = 'sidebar-settings';

  private subscriptions: Subscription[] = [];
  private appSettings: AppSettings;

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(it => it.unsubscribe());
  }

  navToEditor() {
    this.router.navigateByUrl('/editor');
  }
}
