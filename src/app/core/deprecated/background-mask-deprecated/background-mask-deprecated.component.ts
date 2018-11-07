import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-background-mask-deprecated',
  templateUrl: './background-mask-deprecated.component.html',
  styleUrls: ['./background-mask-deprecated.component.scss']
})
export class BackgroundMaskDeprecatedComponent implements OnInit {

  constructor() { }

  /**
   * Image source.
   */
  @Input() src: string;

  /**
   * Blur size. 0 to dismiss the blur. 40 by default.
   */
  @Input() blurSize = 40;

  ngOnInit() {
  }

}
