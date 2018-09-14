import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input, OnChanges, Output,
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
  implements AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  constructor(private cd: ChangeDetectorRef) {
    super();
    this.width = this.defaultWidth;
    this.height = this.defaultHeight;
  }

  protected defaultWidth = 'auto';
  protected defaultHeight = 'auto';

  @ViewChild('componentRow') private componentRow: ElementRef<HTMLDivElement>;
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

  protected componentRowHeight: number;

  @Input() isPrimary = false;

  @Input() isDisabled = false;

  // Styling
  // protected componentClass: string;

  ngAfterContentInit() {
    this.content = this.contentContainer.nativeElement.innerHTML;
  }

  ngAfterContentChecked() {
    this.content = this.contentContainer.nativeElement.innerHTML;
  }

  ngAfterViewInit() {
    this.componentRowHeight = super.getHeightOfBlock(this.componentRow.nativeElement);
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  // private selectAppropriateComponentClass() {
  //   if (!this.isDisabled) {
  //     this.componentClass = `masked_component-${this.componentTheme}`;
  //   } else {
  //     this.componentClass = `masked_component-${this.componentTheme}-disabled`;
  //   }
  // }
}
