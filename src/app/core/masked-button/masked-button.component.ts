import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input, Output,
  ViewChild
} from '@angular/core';
import {MaskedAbstractComponent} from '../masked-abstract/masked-abstract.component';

@Component({
  selector: 'app-masked-button',
  templateUrl: './masked-button.component.html',
  styleUrls: ['./masked-button.component.scss']
})
export class MaskedButtonComponent
  extends MaskedAbstractComponent
  implements AfterContentChecked {

  constructor(private cd: ChangeDetectorRef) {
    super();
    this.width = this.defaultWidth;
    this.height = this.defaultHeight;
  }

  protected defaultWidth = 'auto';
  protected defaultHeight = 'auto';

  @ViewChild('contentContainer') private contentContainer: ElementRef<HTMLDivElement>;

  private _content: string;
  private get content(): string {
    return this._content;
  }
  private set content(val: string) {
    if (this._content !== val) {
      this.contentChanged.emit(val);
    }
  }
  @Output() contentChanged = new EventEmitter<string>();

  @Input() isPrimary = false;

  @Input() isDisabled = false;

  // ngAfterContentInit() {
  //   this.content = this.contentContainer.nativeElement.innerHTML;
  // }

  ngAfterContentChecked() {
    this.content = this.contentContainer.nativeElement.innerHTML;
  }

  // ngAfterViewChecked(): void {
  //   this.cd.detectChanges();
  // }
}
