import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MaskedAbstractComponent} from '../masked-abstract/masked-abstract.component';

@Component({
  selector: 'app-masked-input',
  templateUrl: './masked-input.component.html',
  styleUrls: ['./masked-input.component.scss']
})
export class MaskedInputComponent extends MaskedAbstractComponent implements OnInit {

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
