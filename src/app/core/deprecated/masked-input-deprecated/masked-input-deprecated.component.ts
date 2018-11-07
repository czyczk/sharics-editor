import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MaskedAbstractDeprecatedComponent} from '../masked-abstract-deprecated/masked-abstract-deprecated.component';

@Component({
  selector: 'app-masked-input-deprecated',
  templateUrl: './masked-input-deprecated.component.html',
  styleUrls: ['./masked-input-deprecated.component.scss']
})
export class MaskedInputDeprecatedComponent extends MaskedAbstractDeprecatedComponent implements OnInit {

  constructor() {
    super();
  }

  protected defaultWidth = '8.7rem';
  protected defaultHeight = '2rem';

  /**
   * Type
   */
  @Input() type: 'text' | 'password' = 'text';
  /**
   * Value
   */
  private _value = '';
  @Input() get value() {
    return this._value;
  }
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  set value(val: string) {
    if (this._value !== val) {
      this._value = val;
      this.valueChange.emit(this._value);
    }
  }

}
