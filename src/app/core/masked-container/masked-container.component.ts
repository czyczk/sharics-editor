import {
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
export class MaskedContainerComponent extends MaskedAbstractComponent {

  constructor(private _cd: ChangeDetectorRef) {
    super();
    this.width = this.defaultWidth;
    this.height = this.defaultHeight;
  }

  protected defaultHeight = '100%';
  protected defaultWidth = '100%';

  @Input() useBottomTransition = false;
  @Input() bottomTransitionFrom: 'dark' | 'moderate' | 'light' | 'white' = 'moderate';
  @Input() bottomTransitionTo: 'dark' | 'moderate' | 'light' | 'white' = 'dark';

}
