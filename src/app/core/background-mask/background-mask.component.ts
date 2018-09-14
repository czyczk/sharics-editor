import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-background-mask',
  templateUrl: './background-mask.component.html',
  styleUrls: ['./background-mask.component.scss']
})
export class BackgroundMaskComponent implements OnInit {

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
