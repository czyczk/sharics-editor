import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageDeprecatedComponent } from './deprecated/home-page-deprecated/home-page-deprecated.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { SidebarNormalDeprecatedComponent } from './deprecated/home-page-deprecated/sidebar-deprecated/sidebar-normal-deprecated/sidebar-normal-deprecated.component';
import { SidebarSettingsDeprecatedComponent } from './deprecated/home-page-deprecated/sidebar-deprecated/sidebar-settings-deprecated/sidebar-settings-deprecated.component';
import {ContentRoutingModule} from './content-routing.module';
import {AppRoutingModule} from '../app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import { PlaybackControlBarDeprecatedComponent } from './deprecated/home-page-deprecated/dynamic-bar-deprecated/playback-control-bar-deprecated/playback-control-bar-deprecated.component';
import { SettingsTitleBarDeprecatedComponent } from './deprecated/home-page-deprecated/dynamic-bar-deprecated/settings-title-bar-deprecated/settings-title-bar-deprecated.component';
import { EditorDeprecatedComponent } from './deprecated/home-page-deprecated/main-deprecated/editor-deprecated/editor-deprecated.component';
import { SettingsDeprecatedComponent } from './deprecated/home-page-deprecated/main-deprecated/settings-deprecated/settings-deprecated.component';
import { DynamicBarDeprecatedComponent } from './deprecated/home-page-deprecated/dynamic-bar-deprecated/dynamic-bar-deprecated.component';
import {PlaybackControlStateService} from '../service/playback-control/playback-control-state.service';
import { SidebarDeprecatedComponent } from './deprecated/home-page-deprecated/sidebar-deprecated/sidebar-deprecated.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EditorComponent } from './home-page/main/editor/editor.component';
import { SettingsComponent } from './home-page/main/settings/settings.component';
import { SidebarNormalComponent } from './home-page/sidebar/sidebar-normal/sidebar-normal.component';
import { SidebarSettingsComponent } from './home-page/sidebar/sidebar-settings/sidebar-settings.component';
import { TItleBarComponent } from './home-page/title-bar/title-bar.component';
import { PlaybackControlBarComponent } from './home-page/playback-control-bar/playback-control-bar.component';

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
    HomePageDeprecatedComponent,
    SidebarNormalDeprecatedComponent,
    SidebarSettingsDeprecatedComponent,
    PlaybackControlBarDeprecatedComponent,
    SettingsTitleBarDeprecatedComponent,
    EditorDeprecatedComponent,
    SettingsDeprecatedComponent,
    DynamicBarDeprecatedComponent,
    SidebarDeprecatedComponent,
    HomePageComponent,
    EditorComponent,
    SettingsComponent,
    SidebarNormalComponent,
    SidebarSettingsComponent,
    TItleBarComponent,
    PlaybackControlBarComponent
  ]
})
export class ContentModule { }
