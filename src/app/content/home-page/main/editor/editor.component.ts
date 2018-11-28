import {Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShrDropdownItem} from '../../../../core/shr-dropdown/ShrDropdownItem';
import {AppSettings} from '../../../../shared/app-settings';
import {EditorUtil} from '../../../../util/editor-util';
import {AppSettingsService} from '../../../../service/app-settings/app-settings.service';
import {TranslateService} from '@ngx-translate/core';
import {PlaybackService} from '../../../../service/playback/playback.service';
import {Subscription} from 'rxjs';
import {KeymapUtil} from '../../../../util/keymap-util';
import {TimestampUtil} from '../../../../util/timestamp-util';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  constructor(private appSettingsService: AppSettingsService,
              private translateService: TranslateService,
              private playbackService$: PlaybackService) {
    // Load global app settings
    this.subscriptions.push(appSettingsService.appSettings.subscribe(it => {
      this.appSettings = it;
      // Apply related locale settings
      translateService.setDefaultLang(AppSettings.LocaleSettings.localeFallback);
      translateService.use(it.localeSettings.locale);
    }));
  }

  private subscriptions: Subscription[] = [];
  private appSettings: AppSettings;

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

  // A temporal variable to ignore the next word break.
  // E.g.: For strings like "《字符》", if we stop before "《", after assigning the timestamp, we should skip "字" as well.
  private skipNextBreak = false;

  @ViewChild('textEditor') textEditor: ElementRef<HTMLDivElement>;

  @HostListener('window:keydown', ['$event']) keymap(event: KeyboardEvent) {
    const keymap = this.appSettings.editorKeymap;
    const targetShortcutStr = KeymapUtil.toKeyShortcut(event).toString();

    if (keymap.insertTimestamp.toStringArr().includes(targetShortcutStr)) {
      event.preventDefault();
      this.insertTimestamp(false);
    } else if (keymap.replaceTimestamp.toStringArr().includes(targetShortcutStr)) {
      event.preventDefault();
      this.insertTimestamp(true);
    } else if (keymap.removeTimestamp.toStringArr().includes(targetShortcutStr)) {
      event.preventDefault();
      this.removeTimestamp();
    }
  }

  @HostBinding('style.height') height = '100%';

  ngOnInit() {
    this.updateHighlight();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(it => {
      it.unsubscribe();
    });
  }

  updateHighlight() {
    if (this.highlighted) {
      return;
    }
    this.highlighted = EditorUtil.toHighlighted(this.text, this.appSettings.editorTheme);
  }

  testRange() {
    // TODO: Remember to reset skipNextWordBreak
    this.skipNextBreak = false;
    console.log('testRange');
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    console.log('range:');
    console.log(range);
    console.log('start container is timestamp: ' + this.isTimestampNode(range.startContainer));
    console.log('start container is word breaker: ' + this.isWordBreakerNode(range.startContainer));
  }

  // Check if the content of the node is a timestamp.
  private isTimestampNode(node: Node): boolean {
    if (node) {
      const textContent = node.textContent;
      return textContent && textContent[0] === '[' && textContent[textContent.length - 1] === ']';
    }
    return false;
  }

  // Check if the content of the node is a word breaker.
  private isWordBreakerNode(node: Node): boolean {
    if (node) {
      const textContent = node.textContent;
      return textContent && textContent === '`';
    }
    return false;
  }

  // This is called right after a timestamp insertion or replacement is finished.
  // Several characters can be skipped to make the caret stop at the expected position as related strategies indicate.
  // The range must be provided, which should be the next text fragment node after the timestamp.
  private skipCharsTillBreakpoint(range: Range, afterRemove: boolean) {
    // if (range) {
    //   targetNode = range.startContainer.parentNode.nextSibling;
    //   stopAt = 0;
    // } else {
    //   targetNode = window.getSelection().getRangeAt(0).startContainer.parentNode.nextSibling;
    // }

    // Find the target node we'll focus on.
    // If this is invoked after a timestamp removal, the range will be right inside the text fragment we'll focus on;
    // If this is invoked after a timestamp insertion or replacement, the range will be at the end of the timestamp's text fragment.
    let targetNode: Node;
    let startOffset: number;
    if (afterRemove) {
      targetNode = range.startContainer;
      startOffset = range.startOffset;
    } else {
      targetNode = range.startContainer.parentNode.nextSibling;
      startOffset = 0;
    }
    let stopAt = startOffset;

    // Do nothing if it reaches the end of text
    if (!targetNode) {
      return;
    }
    // Go to the next line if it reaches the end of line
    else if (targetNode.nodeName === 'BR') {
      range = window.getSelection().getRangeAt(0);
      range.setStart(targetNode.nextSibling, 0);
      range.collapse(true);
      return;
    }
    console.log('targetNode:');
    console.log(targetNode);
    const textContent = targetNode.textContent;

    // For Unicode character table, see https://unicode-table.com/en/
    for (; stopAt < textContent.length; stopAt++) {
      let shouldBreak = false;
      const ch = textContent [stopAt];
      console.log('checking char: ' + ch);
      // Stop before the word breaker
      if (ch === '`') {
        shouldBreak = true;
      }
      // Stop after the blank spaces
      else if (ch === ' ') {
        while (textContent[stopAt++] === ' ') { }
        shouldBreak = true;
      }
      else if (ch >= '⅐' && ch <= '⯿' && this.appSettings.breakpointStrategy.stopBeforeUncommonSymbols) {
        // Conditionally stop before [2150 - 2BFF]
        shouldBreak = true;
      }
      // Conditionally stop before "Supplemental Punctuation" [2E00 - 2E7F]
      else if (ch >= '⸀' && ch <= '⹿' && this.appSettings.breakpointStrategy.stopBeforeUncommonSymbols) {
        shouldBreak = true;
      }
      // Stop before CJK characters [2E80 - A4CF]
      else if (ch >= '⺀' && ch <= '꓏') {
        console.log('It\'s in CJK range.');
        // Special cases for full-width symbols
        // Skip "CJK Symbols and Punctuation" [3000 - 303F]
        if (ch >= '　' && ch <= '〿') {
          // Check if it's set to stop before left symbols (optional)
          if (this.appSettings.breakpointStrategy.stopBeforeLeftSymbols) {
            const leftSymbols = '〈《「『【〔〖〘〚〝';
            if (leftSymbols.indexOf(ch) !== -1) {
              shouldBreak = true;
              this.skipNextBreak = true;
            }
          } else {
            continue;
          }
          // Check if it's set to skip to respect Japanese rules. If so, the iteration mark should be skipped (optional)
          if (this.appSettings.breakpointStrategy.skipToRespectJapaneseRules && ch === '々') {
            shouldBreak = true;
          }
        }
        // Special cases for Japanese [3040 - 30FF]
        // Skip Japanese small letters, the prolonged sound mark, Katakana middle dot, iteration mark and sound marks (optional)
        else if (ch >= '぀' && ch <= 'ヿ') {
          console.log('It\'s in Japanese range.');
          if (this.appSettings.breakpointStrategy.skipToRespectJapaneseRules) {
            const charsToBeSkippedHiragana = 'ぁぃぅぇぉっゃゅょゎ゙゚゛゜ゝゞ';
            const charsToBeSkippedKatakana = 'ァィゥェォッャュョヮ・ーヽヾ';
            if (charsToBeSkippedHiragana.indexOf(ch) !== -1 || charsToBeSkippedKatakana.indexOf(ch) !== -1) {
              console.log('Small letter found.');
              continue;
            }
          }
          shouldBreak = true;
        }
        else {
          console.log('It\'s a normal CJK char.');
          shouldBreak = true;
        }
      }

      if (shouldBreak) {
        // If it's the first character we'll checking, we skip it anyhow
        // Don't put this at the beginning since we have special cases (like left symbols) to consider
        if (stopAt === startOffset) {
          continue;
        }

        // Make the variable "skipNextBreak" take effect.
        // See its comment for its usage.
        if (this.skipNextBreak) {
          this.skipNextBreak = false;
        } else {
          break;
        }
      }
    }

    console.log('Should stop at ' + stopAt);
    range = document.getSelection().getRangeAt(0); // Must re-obtain the range from the document or operations below won't take effect
    range.setStart(targetNode, stopAt);
    range.collapse(true);

    if (this.appSettings.breakpointStrategy.skipEndOfLine && targetNode.nextSibling.nodeName === 'BR') {
      range.setStartAfter(targetNode);
      range.collapse(true);
    }
  }

  /**
   * Insert or replace a timestamp. For command 'insert timestamp' and 'replace timestamp'.
   * @param removeExisting `true` to replace the timestamp or `false` to insert a timestamp
   */
  insertTimestamp(removeExisting: boolean) {
    // Make sure the caret is inside the editor
    if (document.activeElement !== this.textEditor.nativeElement) {
      return;
    }

    // Get the current caret position
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);

    // Fetch the timestamp
    this.playbackService$.getTimestamp().subscribe(it => {
      // Select the word breaker if there's one nearby
      const wordBreakerNode = this.findNearestTimestamp(range);
      if (wordBreakerNode) {
        range.selectNode(wordBreakerNode);
      }
      // If we're not near a word breaker, select the existing timestamp if necessary
      else if (removeExisting) {
        // Find the nearest timestamp
        const timestampNode = this.findNearestTimestamp(range);
        // Select the timestamp node if it's found. The node will be overridden by `document.execCommand` later.
        if (timestampNode) {
          range.selectNode(timestampNode);
        }
      }

      // Insert a new timestamp (override the old one if selected)
      document.execCommand('insertHTML', false,
        `<span style="color: ${this.appSettings.editorTheme.timestampColor}; font-family: ${this.appSettings.editorTheme.timestampFont}">` +
        TimestampUtil.formatSquareBrackets(it.msg) + `</span>`);
      // TODO debug info
      console.log(window.getSelection().getRangeAt(0));

      // Stop at the next breakpoint
      this.skipCharsTillBreakpoint(window.getSelection().getRangeAt(0), false);
    });
  }

  removeTimestamp() {
    // Get the current caret position
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);

    const timestampNode = this.findNearestTimestamp(range);
    if (timestampNode) {
      range.selectNode(timestampNode);
      document.execCommand('delete');
    }
  }

  // Find the nearest word breaker node
  private findNearestWordBreakerNode(range: Range): Node {
    // How to find the nearest word breaker?
    // 1. Look into itself,
    // 2. Positioned at the container start -> Look backward,
    // 3. Positioned at the container end -> Look forward.
    let wordBreakerNode: Node = null;
    // Look into itself
    if (this.isWordBreakerNode(range.startContainer)) {
      // If it's a word breaker node, we must ensure we select an ELEMENT_NODE
      wordBreakerNode = range.startContainer;
      if (wordBreakerNode.nodeType === Node.TEXT_NODE) {
        wordBreakerNode = wordBreakerNode.parentNode;
      }
    }
    // If the start container is not a word breaker node, we must be inside the ELEMENT_NODE,
    // so we care about its direct sibling nodes
    // If we're at the container start, look backward
    else if (range.startOffset === 0 && this.isWordBreakerNode(range.startContainer.previousSibling)) {
      wordBreakerNode = range.startContainer.previousSibling;
    }
    // If we're at the container end, look forward
    else if (
      range.startOffset === range.startContainer.textContent.length &&
      this.isWordBreakerNode(range.startContainer.nextSibling)
    ) {
      wordBreakerNode = range.startContainer.nextSibling;
    }

    return wordBreakerNode;
  }

  // Find the nearest timestamp
  private findNearestTimestamp(range: Range): Node {
    // 1. Look into itself,
    // 2. Positioned at the container start -> Look backward,
    // 3. Positioned at the container end -> Look forward.
    let timestampNode: Node = null;
    // Look into itself
    if (this.isTimestampNode(range.startContainer)) {
      // If it's a timestamp node, we must ensure we select an ELEMENT_NODE
      timestampNode = range.startContainer;
      if (timestampNode.nodeType === Node.TEXT_NODE) {
        timestampNode = timestampNode.parentNode;
      }
    }
    // If the start container is not a timestamp node, we must be inside the ELEMENT_NODE,
    // so we care about its direct sibling nodes
    // If we're at the container start, look backward
    else if (range.startOffset === 0 && this.isTimestampNode(range.startContainer.previousSibling)) {
      timestampNode = range.startContainer.previousSibling;
    }
    // If we're at the container end, look forward
    else if (
      range.startOffset === range.startContainer.textContent.length &&
      this.isTimestampNode(range.startContainer.nextSibling)
    ) {
      timestampNode = range.startContainer.nextSibling;
    }

    return timestampNode;
  }

}
