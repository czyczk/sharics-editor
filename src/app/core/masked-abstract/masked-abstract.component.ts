import {Input, OnInit} from '@angular/core';
import {MarginParser} from '../util/MarginParser';

export abstract class MaskedAbstractComponent implements OnInit {

  /**
   * Width
   */
  protected abstract defaultWidth: string;
  @Input() width: string;
  @Input() minWidth = '';
  /**
   * Height
   */
  protected abstract defaultHeight: string;
  @Input() height: string;
  @Input() minHeight = '';

  // Margin params.
  @Input() private margin: string;
  /**
   * Margin top. Specify it to override the margin array.
   */
  @Input() marginTop: string;
  /**
   * Margin right. Specify it to override the margin array.
   */
  @Input() marginRight: string;
  /**
   * Margin bottom. Specify it to override the margin array.
   */
  @Input() marginBottom: string;
  /**
   * Margin left. Specify it to override the margin array.
   */
  @Input() marginLeft: string;

  @Input() backgroundTheme: 'dark' | 'moderate' | 'light' | 'white' = 'moderate';
  @Input() componentTheme: 'none' | 'dark' | 'moderate' | 'light' | 'white' = 'light';

  ngOnInit() {
    this.parseMargin();
  }

  parseMargin() {
    // Parse the margin array
    const marginObj = MarginParser.parseMargin(this.margin);
    // If the single values are not specified, adopt the value in the array
    if (!this.marginTop) {
      this.marginTop = marginObj.top;
    }
    if (!this.marginRight) {
      this.marginRight = marginObj.right;
    }
    if (!this.marginBottom) {
      this.marginBottom = marginObj.bottom;
    }
    if (!this.marginLeft) {
      this.marginLeft = marginObj.left;
    }
  }

  getWidthOfBlock(block: HTMLDivElement): number {
    return block.getBoundingClientRect().width;
  }

  getHeightOfBlock(block: HTMLDivElement): number {
    return block.getBoundingClientRect().height;
  }

}
