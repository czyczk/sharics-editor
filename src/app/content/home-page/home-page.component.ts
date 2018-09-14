import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  @ViewChild(RouterOutlet) routerOutlet: RouterOutlet;

  ngOnInit() {
  }
}
