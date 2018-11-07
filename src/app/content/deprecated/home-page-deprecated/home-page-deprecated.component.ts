import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home-page-deprecated',
  templateUrl: './home-page-deprecated.component.html',
  styleUrls: ['./home-page-deprecated.component.scss']
})
export class HomePageDeprecatedComponent implements OnInit {

  constructor(private router: Router) { }

  @ViewChild(RouterOutlet) routerOutlet: RouterOutlet;

  ngOnInit() {
  }
}
