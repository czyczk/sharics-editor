import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {PlaybackService} from './service/playback/playback.service';
import {FileService} from './service/file/file.service';
import {AppSettingsService} from './service/app-settings/app-settings.service';
import {TestsPageModule} from './test/tests-page/tests-page.module';
import {ContentModule} from './content/content.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ApiService} from './service/api.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    TestsPageModule,
    ContentModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    AppSettingsService,
    ApiService,
    PlaybackService,
    FileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
