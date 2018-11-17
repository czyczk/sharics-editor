import {Component, HostBinding, OnInit} from '@angular/core';
import {ShrDropdownItem} from '../../../../core/shr-dropdown/ShrDropdownItem';
import {AppSettings} from '../../../../shared/app-settings';
import {EditorUtil} from '../../../../util/editor-util';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  text = '[ti:Lemon]\n' +
    '[ar:米津玄師]\n' +
    '[al:Lemon]\n' +
    '[ed:2]\n' +
    '[rt:100]\n' +
    '[ml:0|0]\n' +
    '[00:00.897]夢[00:01.268]な[00:01.633]ら[00:01.762]ば[00:02.274]ど[00:02.653]れ[00:02.993]ほ[00:03.144]ど[00:03.643]よ[00:04.046]かっ[00:04.360]た[00:04.506]で[00:04.989]しょ[00:05.429]う[00:05.831]\n' +
    '[00:06.445]未[00:06.754]だ[00:07.427]に[00:07.791]あ[00:07.954]な[00:08.055]た[00:08.819]の[00:09.173]こ[00:09.331]と[00:09.463]を[00:10.061]夢[00:10.582]に[00:10.809]み[00:10.886]る[00:11.270]\n' +
    '[00:11.959]忘[00:12.291]れ[00:12.592]た[00:12.727]物[00:13.665]を[00:13.984]取[00:14.120]り[00:14.672]に[00:15.042]帰[00:15.534]る[00:16.093]よ[00:16.227]う[00:16.373]に[00:16.930]\n' +
    '[00:17.460]古[00:17.755]び[00:18.484]た[00:18.832]思[00:19.148]い[00:19.480]出[00:19.849]の[00:20.183]埃[00:21.195]を[00:21.741]払[00:22.762]う\n' +
    '[00:22.979]\n' +
    '[00:25.638]戻[00:26.049]ら[00:26.402]な[00:26.538]い[00:27.026]幸[00:27.930]せ[00:28.445]が[00:28.802]あ[00:29.140]る[00:29.284]こ[00:29.793]と[00:30.163]を[00:30.568]\n' +
    '[00:31.224]最[00:31.518]後[00:32.222]に[00:32.584]あ[00:32.750]な[00:32.881]た[00:33.614]が[00:33.947]教[00:34.340]え[00:35.014]て[00:35.353]く[00:35.543]れ[00:35.653]た[00:36.080]\n' +
    '[00:36.774]言[00:36.937]え[00:37.082]ず[00:37.451]に[00:37.597]隠[00:38.490]し[00:38.826]て[00:38.958]た[00:39.442]昏[00:40.155]い[00:40.285]過[00:40.816]去[00:41.195]も[00:41.587]\n' +
    '[00:42.246]あ[00:42.398]な[00:42.546]た[00:43.250]が[00:43.629]い[00:43.772]な[00:43.983]きゃ永遠`に昏いまま\n' +
    '[00:47.424]\n';

  highlighted = '';

  languageOptions = [ new ShrDropdownItem('en-us', 'English'),
    new ShrDropdownItem('ja', 'Japanese'),
    new ShrDropdownItem('zh-hans', 'Chinese (simplified)'),
    new ShrDropdownItem('zh-hant', 'Chinese (traditional)')
  ];

  private appSettings: AppSettings = new AppSettings();

  constructor() { }

  @HostBinding('style.height') height = '100%';

  ngOnInit() {
    this.appSettings.editorTheme.timestampColor = '#e57e31';
    this.appSettings.editorTheme.wordBreakerColor = '#df782b';
    this.updateHighlight();
  }

  updateHighlight() {
    if (this.highlighted) {
      return;
    }
    this.highlighted = EditorUtil.toHighlighted(this.text, this.appSettings.editorTheme);
  }

}
