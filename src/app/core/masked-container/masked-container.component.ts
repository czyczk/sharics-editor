import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import {MaskedAbstractComponent} from '../masked-abstract/masked-abstract.component';

@Component({
  selector: 'app-masked-container',
  templateUrl: './masked-container.component.html',
  styleUrls: ['./masked-container.component.scss']
})
export class MaskedContainerComponent extends MaskedAbstractComponent implements AfterContentInit {

  constructor(private _cd: ChangeDetectorRef) {
    super();
    this.width = this.defaultWidth;
    this.height = this.defaultHeight;
    this.componentTheme = 'none';
  }

  protected defaultHeight = '100%';
  protected defaultWidth = '100%';

  protected contentClass: string[];

  @Input() useBottomTransition = false;
  @Input() bottomTransitionFrom: 'dark' | 'moderate' | 'light' | 'white' = 'moderate';
  @Input() bottomTransitionTo: 'dark' | 'moderate' | 'light' | 'white' = 'dark';
  @Input() isContentFullWidth = false;

  ngAfterContentInit() {
    this.contentClass = [];
    if (this.componentTheme !== 'none') {
      this.contentClass.push('masked_component-' + this.componentTheme);
    }
    if (this.isContentFullWidth) {
      this.contentClass.push('content--full-width');
    }
  }

}
