import {Injectable, OnInit} from '@angular/core';
import {AppSettings} from '../../shared/app-settings';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService implements OnInit {

  constructor() { }

  // The key to fetch the app settings from the local storage
  private static settingsKey = 'configuration';

  // Global app settings subject
  public appSettings: Subject<AppSettings>;

  ngOnInit() {
    this.loadSettings();
  }

  /**
   *Get the settings from the local storage (fallback to the default settings and save them on failures)
   */
  loadSettings() {
    console.log('loading settings');
    const settingsStr = localStorage.getItem(AppSettingsService.settingsKey);
    if (settingsStr) {
      // If the settings are available from the local storage, parse it
      this.appSettings.next(JSON.parse(settingsStr));
    } else {
      // Else, load the default settings and save it to the local storage
      this.appSettings.next(this.loadDefaultSettings());
    }
  }

  // Get the default app settings
  private loadDefaultSettings() {
    return new AppSettings();
  }

  /**
   * Save the settings to local storage
   * @param settings The settings to be saved
   */
  saveSettings(settings: AppSettings) {
    localStorage.setItem(AppSettingsService.settingsKey, JSON.stringify(settings));
  }

  /**
   * Remove the settings in the local storage and load the default settings.
   * The default settings will be saved to the local storage.
   */
  resetToDefault() {
    // Delete the settings in the local storage
    localStorage.removeItem(AppSettingsService.settingsKey);
    // Load settings from the local storage (it will fail, loading and saving the default settings)
    return this.loadSettings();
  }

  // private handleErrors(error: HttpErrorResponse): Observable<AppSettings> {
  //   // Log the error to the console
  //   switch (error.status) {
  //     case 404: {
  //       console.error('Can\'t find global app settings.');
  //       break;
  //     }
  //     default: {
  //       console.error(error);
  //     }
  //   }
  //
  //   // Return the default app settings
  //   return of<AppSettings>(new AppSettings());
  // }
}
