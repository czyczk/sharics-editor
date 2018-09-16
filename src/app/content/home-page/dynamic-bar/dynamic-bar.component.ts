import {Component, HostBinding, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-dynamic-bar',
  templateUrl: './dynamic-bar.component.html',
  styleUrls: ['./dynamic-bar.component.scss']
})
export class DynamicBarComponent implements OnInit {

  constructor(private router: Router) {
    this.routeUrl = router.url;
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.routeUrl = e.url;
      }
    });
  }

  routeUrl = '/editor';

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%';

  ngOnInit() { }
}
