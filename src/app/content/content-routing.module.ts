import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SidebarNormalDeprecatedComponent} from './deprecated/home-page-deprecated/sidebar-deprecated/sidebar-normal-deprecated/sidebar-normal-deprecated.component';
import {SidebarSettingsDeprecatedComponent} from './deprecated/home-page-deprecated/sidebar-deprecated/sidebar-settings-deprecated/sidebar-settings-deprecated.component';
import {HomePageDeprecatedComponent} from './deprecated/home-page-deprecated/home-page-deprecated.component';
import {PlaybackControlBarDeprecatedComponent} from './deprecated/home-page-deprecated/dynamic-bar-deprecated/playback-control-bar-deprecated/playback-control-bar-deprecated.component';
import {SettingsTitleBarDeprecatedComponent} from './deprecated/home-page-deprecated/dynamic-bar-deprecated/settings-title-bar-deprecated/settings-title-bar-deprecated.component';
import {EditorDeprecatedComponent} from './deprecated/home-page-deprecated/main-deprecated/editor-deprecated/editor-deprecated.component';
import {SettingsDeprecatedComponent} from './deprecated/home-page-deprecated/main-deprecated/settings-deprecated/settings-deprecated.component';

// Workaround to fix the bug as in https://github.com/angular/angular/issues/16406#issuecomment-327348947
const routes: Routes = [
  { path: '', component: HomePageDeprecatedComponent, children: [
      { path: 'editor', children: [
          // { path: '', component: EditorComponent },
          // { path: '', component: SidebarNormalComponent, outlet: 'sidebar' },
          // { path: '', component: PlaybackControlBarComponent, outlet: 'dynamicBar' },
        ] },
      { path: 'settings', children: [
          // { path: '', component: SettingsComponent },
          // { path: '', component: SidebarSettingsComponent, outlet: 'sidebar' },
          // { path: '', component: SettingsTitleBarComponent, outlet: 'dynamicBar' }
        ] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
