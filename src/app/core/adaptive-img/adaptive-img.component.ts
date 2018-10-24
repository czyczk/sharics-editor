import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-adaptive-img',
  templateUrl: './adaptive-img.component.html',
  styleUrls: ['./adaptive-img.component.scss']
})
export class AdaptiveImgComponent implements OnInit, AfterViewInit {
  /**
   * The image source.
   */
  @Input() src: string;

  /**
   * The width of the image. Can be in any of the valid units.
   */
  @Input() width = '100%';

  /**
   * The height of the image. Can be in any of the valid units.
   */
  @Input() height = '100%';

  /**
   * The shape of the image. Can be either 'rectangle' (default) or 'circle'.
   */
  @Input() shape: 'rectangle' | 'circle' = 'rectangle';

  /**
   * The placeholder to be shown when the source is not available.
   */
  @Input() placeholder = '../../../assets/img-placeholder/placeholder-question-mark.png';

  /**
   * Border style (the same as 'border' in CSS). 'none' by default.
   */
  @Input() borderStyle = 'none';

  /**
   * Use the default shadow style or not. `false` by default.
   */
  @Input() useShadow = false;

  /**
   * Blur size. 0 to dismiss the blur. 0 by default.
   */
  @Input() blurSize = 0;

  @ViewChild('container') container: ElementRef<HTMLDivElement>;
  @ViewChild('imgContent') imgContent: ElementRef<HTMLImageElement>;

  protected imgContentClass: string;

  /**
   * Calculate the ARs to determine the content class again after the window is resized.
   */
  @HostListener('window:resize') onResize() {
    this.checkContentClass();
  }

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.checkContentClass();
    // ! Important: Fix "Expression has changed after it was checked"
    this.cd.detectChanges();
  }

  /**
   * Check whether an image is a portrait or not.
   * Assign the corresponding class to `imgContentClass`.
   */
  checkContentClass() {
    // Use portrait class if AR of the image < AR of the view (container)
    // Doesn't matter comparing to NaN since the image is not ready yet
    const containerAr = this.container.nativeElement.clientWidth / this.container.nativeElement.clientHeight;
    const imageAr = this.imgContent.nativeElement.naturalWidth / this.imgContent.nativeElement.naturalHeight;
    if (imageAr < containerAr) {
      this.imgContentClass = 'img--portrait';
    } else {
      this.imgContentClass = 'img--landscape';
    }
  }
}
