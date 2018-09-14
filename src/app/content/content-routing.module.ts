import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SidebarNormalComponent} from './home-page/sidebar/sidebar-normal/sidebar-normal.component';
import {SidebarSettingsComponent} from './home-page/sidebar/sidebar-settings/sidebar-settings.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PlaybackControlBarComponent} from './home-page/dynamic-bar/playback-control-bar/playback-control-bar.component';
import {SettingsTitleBarComponent} from './home-page/dynamic-bar/settings-title-bar/settings-title-bar.component';
import {EditorComponent} from './home-page/main/editor/editor.component';
import {SettingsComponent} from './home-page/main/settings/settings.component';

// Workaround to fix the bug as in https://github.com/angular/angular/issues/16406#issuecomment-327348947
const routes: Routes = [
  { path: '', component: HomePageComponent, children: [
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
