import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-adaptive-img',
  templateUrl: './test-adaptive-img.component.html',
  styleUrls: ['./test-adaptive-img.component.css']
})
export class TestAdaptiveImgComponent implements OnInit {

  constructor() { }

  active = 'Landscape 1';

  ngOnInit() {
  }

  changeActive(btn: HTMLButtonElement) {
    console.log(btn.innerText);
    this.active = btn.innerText;
  }

}
