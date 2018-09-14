import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { SidebarNormalComponent } from './home-page/sidebar/sidebar-normal/sidebar-normal.component';
import { SidebarSettingsComponent } from './home-page/sidebar/sidebar-settings/sidebar-settings.component';
import {ContentRoutingModule} from './content-routing.module';
import {AppRoutingModule} from '../app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import { PlaybackControlBarComponent } from './home-page/dynamic-bar/playback-control-bar/playback-control-bar.component';
import { SettingsTitleBarComponent } from './home-page/dynamic-bar/settings-title-bar/settings-title-bar.component';
import { EditorComponent } from './home-page/main/editor/editor.component';
import { SettingsComponent } from './home-page/main/settings/settings.component';
import { DynamicBarComponent } from './home-page/dynamic-bar/dynamic-bar.component';
import {PlaybackControlStateService} from '../service/playback-control/playback-control-state.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ContentRoutingModule,
    SharedModule,
  ],
  providers: [
    // { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
    PlaybackControlStateService,
  ],
  declarations: [
    HomePageComponent,
    SidebarNormalComponent,
    SidebarSettingsComponent,
    PlaybackControlBarComponent,
    SettingsTitleBarComponent,
    EditorComponent,
    SettingsComponent,
    DynamicBarComponent
  ]
})
export class ContentModule { }
