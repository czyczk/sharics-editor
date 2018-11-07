import {Component, Input, OnInit} from '@angular/core';
import {ShrDropdownItem} from '../../shared/ShrDropdownItem';

@Component({
  selector: 'shr-dropdown',
  templateUrl: './shr-dropdown.component.html',
  styleUrls: ['./shr-dropdown.component.scss']
})
export class ShrDropdownComponent implements OnInit {

  constructor() { }

  @Input() options: ShrDropdownItem[];
  @Input() height = '30px';


  /** Properties that help calculate styles of the triangle arrow */
  protected heightValue: number;
  protected heightFormat: string;

  // The container of the triangle arrow is a rectangle the same size of the dropdown height
  protected arrowContainerSize: number;
  // Width of triangle / width of container
  protected arrowSizeRatio = 27 / 96;

  ngOnInit() {
    this.extractSize(this.height);
  }

  private extractSize(size: string) {
    // i will stop before the first character indicating the format
    let i = 0;
    for (; i < size.length; i++) {
      if (size[i] >= '0' && size[i] <= '9') {
        continue;
      }
      break;
    }

    // Extract the size
    this.heightValue = parseInt(size.substring(0, i), 10);
    this.heightFormat = size.substring(i);
    console.log(`heightValue: ${this.heightValue}`);
    console.log(`heightFormat: ${this.heightFormat}`);

    // Set the properties that help calculate style of the triangle arrow
    this.arrowContainerSize = this.heightValue;
  }

}
