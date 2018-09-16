import { Component, OnInit } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) {
    this.routeUrl = this.router.url;
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.routeUrl = e.url;
      }
    });
  }

  routeUrl = '/editor';

  ngOnInit() {
  }

}
