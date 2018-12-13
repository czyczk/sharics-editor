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
import {BrowserDetection, browserDetection} from '@angular/platform-browser/testing/src/browser_util';
import {BrowserDetector} from '../../../../util/browser-detector';

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

  // A temporal variable to prevent onInput() being executed. Sometimes work is done with no extra work needed.
  // E.g.: On page load, highlighted text is inserted; On inserting a timestamp.
  private preventNextInputDetection = true;

  @ViewChild('textEditor') textEditor: ElementRef<HTMLDivElement>;

  @HostBinding('style.height') height = '100%';

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

  ngOnInit() {
    this.updateHighlight();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(it => {
      it.unsubscribe();
    });
  }

  updateHighlight() {
    // Get the highlighted text
    this.highlighted = EditorUtil.toHighlighted(this.text, this.appSettings.editorTheme);

    // Replace contents in the editor.
    // (We can't use [innerHTML] for the element because of security concerns, Angular eliminates all the formats.)
    this.textEditor.nativeElement.focus(); // Webkit based browsers throw errors without this line
    const sel = window.getSelection();
    let range = sel.getRangeAt(0);
    range.selectNodeContents(this.textEditor.nativeElement);
    document.execCommand('insertHTML', false, this.highlighted);

    // Page content changed. Reposition the caret to the start.
    range = sel.getRangeAt(0);
    range.setStart(this.textEditor.nativeElement, 0);
    range.collapse(true);
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

      // Insert a new timestamp (override the old one if selected). Prevent input detection.
      this.preventNextInputDetection = true;
      document.execCommand('insertHTML', false,
        EditorUtil.formatAsTimestamp(TimestampUtil.formatSquareBrackets(it.msg), this.appSettings.editorTheme));
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

    // Find the timestamp nearby and remove it. Prevent input detection.
    const timestampNode = this.findNearestTimestamp(range);
    if (timestampNode) {
      this.preventNextInputDetection = true;
      range.selectNode(timestampNode);
      document.execCommand('delete');
    }
  }

  onInput(event: UIEvent) {
    if (this.preventNextInputDetection) {
      this.preventNextInputDetection = false;
      console.log('Input detection prevented.');
      return;
    }

    // Get the current caret position
    const sel = window.getSelection();
    let range = sel.getRangeAt(0);
    let startOffset = range.startOffset;

    // If we are talking about SPAN, make sure we take the right ELEMENT_NODE
    let currentNode = range.startContainer;
    if (currentNode.nodeType === Node.TEXT_NODE && currentNode.parentNode.nodeName === 'SPAN') {
      currentNode = currentNode.parentNode;
    }

    let isCaseFound: boolean;
    let isCase1 = false;
    let isCase2 = false;
    let isCase3 = false;
    let isCase4 = false;
    let isCase5 = false;
    let indexOfRightBracket = -1; // A variable used in case 1, 3 and 5
    let indexOfLeftBracket = -1; // A variable used in case 1, 4 and 5

    // Case 1: A removal operation removes the ending "]" of a timestamp. Degrade the node to a normal text node.
    // Condition: We are in a timestamp formatted node (SPAN) and no "]" after the "[" is found.
    // Case 2: A removal operation removes the starting "[" of a timestamp. Degrade the node to a normal text node.
    // Condition: We are in a timestamp formatted node (SPAN) and no "[" before the "]" is found.
    // Case 3: A "[" is inserted to form a timestamp. Upgrade the range to a timestamp node.
    // Condition: Inserted in a text node and can match the "]" in the same node. The caret can't be at the beginning nor the end.
    // Case 4: A "]" is inserted to form a timestamp. Upgrade the range to a timestamp node.
    // Condition: Inserted in a text node and can match the "[" in the same node. The caret can't be at the beginning.
    // Case 5: A character is inserted at the end of a timestamp or a word breaker. Move the character outside the SPAN node.
    // Condition: If case 1 and 2 are ruled out, we only need to make sure we are at the end and the last character is neither "]" nor "`".
    // Case 6: A character is inserted at the beginning of a timestamp or a word breaker. Move the character outside the SPAN node.
    // Condition: If case 1 and 2 are ruled out, we only need to make sure we are at the beginning and the first character is neither "[" nor "`".
    // * Note:
    // Webkit-based browsers doesn't differentiate the ending of SPAN from the beginning of the next text node, so
    // For case 1: Backspaces may lead us into a word breaker node.
    // For case 5: It's a possible case since characters can always be inserted after the end of a timestamp.
    if (currentNode.nodeName === 'SPAN') {
      // Before making decision, check if either of the sibling nodes is SPAN so that we can merge nodes.
      // If we delete a range containing the right half of the previous timestamp and the left half of the next timestamp,
      // it still remains a timestamp node.
      // TODO: Remember to check if they have the same style
      // Webkit-based browsers remain the caret in the former node.
      if (BrowserDetector.isBlink() && currentNode.nextSibling && currentNode.nextSibling.nodeName === 'SPAN') {
        // Merge the nodes
        const nextNode = currentNode.nextSibling;
        const textInNextNode = nextNode.textContent;
        currentNode.textContent += textInNextNode;
        range.selectNode(nextNode);
        document.execCommand('delete');
        // Restore caret position
        range = sel.getRangeAt(0);
        range.setStart(range.startContainer, startOffset);
        range.collapse(true);
        // Update the current node and then make the decision
        currentNode = range.startContainer.parentNode;
      }
      // Firefox remains the caret in the latter node.
      else if (BrowserDetector.isFirefox() && currentNode.previousSibling && currentNode.previousSibling.nodeName === 'SPAN') {
        // Merge the nodes
        const previousNode = currentNode.previousSibling;
        const textInPreviousNode = previousNode.textContent;
        currentNode.textContent = textInPreviousNode + currentNode.textContent;
        previousNode.parentNode.removeChild(previousNode);
        // Restore caret position
        range = sel.getRangeAt(0); // Range's start container is the SPAN
        console.log(range);
        range.setStart(range.startContainer.firstChild, textInPreviousNode.length);
        range.collapse(true);
        // Update the current node and then make the decision
        currentNode = range.startContainer;
      }

      const textContent = currentNode.textContent;
      for (let i = 0; i < textContent.length; i++) {
        const ch = textContent[i];
        // Only the first "[]" pair counts
        if (ch === '[' && indexOfLeftBracket === -1) {
          indexOfLeftBracket = i;
        } else if (ch === ']' && indexOfRightBracket === -1) {
          indexOfRightBracket = i;
        }
        if (indexOfLeftBracket !== -1 && indexOfRightBracket !== -1) {
          break;
        }
      }
      // See if case 1 or 2 is applicable.
      if (indexOfLeftBracket !== -1 && indexOfRightBracket === -1) {
        // TODO: Before making decisions, try to find a "]" in the next text node
        isCase1 = true;
      } else if (indexOfLeftBracket === -1 && indexOfRightBracket !== -1) {
        console.log(range);
        // TODO: Before making decisions, try to find a "[" in the previous text node
        isCase2 = true;
        // Record the length of the previous text node since they'll be merged and we need the length to restore the caret position
        if (currentNode.previousSibling && currentNode.previousSibling.nodeName === '#text') {
          startOffset = currentNode.previousSibling.textContent.length;
        }
      }
      // We are in a SPAN node where a "[]" pair is found or it starts with "`".
      // See if case 5 is applicable.
      else {
        const lastChar = textContent[textContent.length - 1];
        if (startOffset === textContent.length && lastChar !== ']' && lastChar !== '`') {
          isCase5 = true;
        }
      }
    }
    // Caret at the beginning of the current node
    else if (startOffset === 0) {
      // There's possibility that the caret is at the start of the text node after the SPAN.
      // (This is the case when we select multiple chars and remove them in Firefox.)
      // Look backward to see if case 1 is applicable.
      if (currentNode.previousSibling && currentNode.previousSibling.nodeName === 'SPAN') {
        const textContent = currentNode.previousSibling.textContent;
        if (!textContent.startsWith('`')) {
          if (textContent[textContent.length - 1] !== ']') {
            isCase1 = true;
          }
        }
        startOffset = textContent.length;
        currentNode = currentNode.previousSibling;
      }
    }
    // Caret not at the beginning
    else {
      // See if case 4 is applicable
      let textContent = currentNode.textContent;
      // After inserting "]", the caret will be right after the char
      if (textContent[startOffset - 1] === ']') {
        // See if a matching "[" can be found before the caret in the same node (the last one counts if there are multiple ones)
        indexOfLeftBracket = textContent.substring(0, startOffset - 1).lastIndexOf('[');
        if (indexOfLeftBracket !== -1) {
          isCase4 = true;
        }
      }
      // There's possibility that the caret is at the end of the text node before the SPAN.
      // Look forward to see if case 2 is applicable.
      else if (startOffset === currentNode.textContent.length && currentNode.nextSibling && currentNode.nextSibling.nodeName === 'SPAN') {
        textContent = currentNode.nextSibling.textContent;
        if (!textContent.startsWith('`')) {
          if (textContent[0] !== '[') {
            isCase2 = true;
          }
        }
        currentNode = currentNode.nextSibling;
        // The node will later be combined with the previous text node, so do not change start offset that was just recorded
      }
      // The caret position is in the middle of a text node, see if case 3 is applicable
      else {
        // After inserting "[", the caret will be right after the char
        if (startOffset && textContent[startOffset - 1] === '[') {
          // See if a matching "]" can be found after the caret in the same node
          indexOfRightBracket = textContent.substr(startOffset).indexOf(']');
          if (indexOfRightBracket !== -1) {
            indexOfRightBracket += startOffset;
            isCase3 = true;
          }
        }
      }
    }

    isCaseFound = isCase1 || isCase2 || isCase3 || isCase4 || isCase5;

    if (isCaseFound) {
      if (isCase1) {
        console.log('Input detection: Case 1 applied.');
        // Degrade it by selecting the node and remove the format
        range.selectNodeContents(currentNode);
        document.execCommand('removeFormat');

        // Merge the text nodes to make Webkit behave as in Firefox, or we cannot set caret across text nodes
        this.textEditor.nativeElement.normalize();
        range = sel.getRangeAt(0);
        currentNode = range.startContainer;
        const indexOfLastLeftBracket = currentNode.textContent.lastIndexOf('[');
        range.setStart(currentNode, indexOfLastLeftBracket + startOffset);
        range.collapse(true);
      } else if (isCase2) {
        console.log('Input detection: Case 2 applied.');
        // Degrade it by selecting the node and remove the format
        range.selectNode(currentNode);
        document.execCommand('removeFormat');

        // Merge the text nodes to make Webkit behave as in Firefox, or we cannot set caret across text nodes
        this.textEditor.nativeElement.normalize();
        // Restore the caret position
        range = sel.getRangeAt(0);
        currentNode = range.startContainer;
        range.setStart(currentNode, startOffset);
        range.collapse(true);
      } else if (isCase3) {
        console.log('Input detection: Case 3 applied.');

        // Select the text to encapsulate into a timestamp node.
        // The caret stops right after "[" and the "]" needs to be included,
        // so the range is [startOffset - 1, indexOfRightBracket]
        range.setStart(currentNode, startOffset - 1);
        range.setEnd(currentNode, indexOfRightBracket + 1);
        const timestampText = range.startContainer.textContent.substring(startOffset - 1, indexOfRightBracket + 1);

        // Style it
        document.execCommand('insertHTML', null, EditorUtil.formatAsTimestamp(timestampText, this.appSettings.editorTheme));
        // Restore caret position
        range = sel.getRangeAt(0);
        currentNode = range.startContainer;
        range.setStart(currentNode, 1);
        range.collapse(true);
      } else if (isCase4) {
        console.log('Input detection: Case 4 applied.');

        // Select the text to encapsulate into a timestamp node.
        // The caret stops right after "]",
        // so the range is [indexOfLeftBracket, startOffset - 1]
        range.setStart(currentNode, indexOfLeftBracket);
        range.setEnd(currentNode, startOffset);
        const timestampText = currentNode.textContent.substring(indexOfLeftBracket, startOffset);

        // Style it
        document.execCommand('insertHTML', null, EditorUtil.formatAsTimestamp(timestampText, this.appSettings.editorTheme));
        // Restore caret position
        range = sel.getRangeAt(0);
        currentNode = range.startContainer;
        range.setStart(currentNode, startOffset - indexOfLeftBracket);
        range.collapse(true);
      } else if (isCase5) {
        console.log('Input detection: Case 5 applied.');
        // Move the last character outside by
        // Selecting the inserted char
        range.setStart(range.startContainer, startOffset - 1);
        range.setEnd(range.startContainer, startOffset);
        // Remove style
        document.execCommand('removeFormat');
        // Merge the text with the next text node (needed in Webkit)
        this.textEditor.nativeElement.normalize();
        // Restore caret position
        range = sel.getRangeAt(0);
        currentNode = range.endContainer;
        range.setStart(currentNode, 1);
        range.collapse(true);
      }
    }

    // Tried to move the caret out of timestamp nodes if none of the cases apply, which might make the process easier,
    // but it didn't work since Webkit doesn't differentiate the ending of a SPAN from the beginning of a text node.
    // The workaround is to consider all possible positions of the caret as the code above 😂
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
