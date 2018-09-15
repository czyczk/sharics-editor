import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-settings-title-bar',
  templateUrl: './settings-title-bar.component.html',
  styleUrls: ['./settings-title-bar.component.scss']
})
export class SettingsTitleBarComponent implements OnInit {

  constructor(translate: TranslateService) {
    console.log(translate.getDefaultLang());
    translate.setDefaultLang('en-US');
    translate.use('en-US');
    translate.get('settings-title-bar.btn-settings').subscribe(it => {
      console.log(it);
    })
  }

  ngOnInit() {
  }

}
