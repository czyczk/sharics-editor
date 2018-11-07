import {Component, HostBinding, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-dynamic-bar-deprecated',
  templateUrl: './dynamic-bar-deprecated.component.html',
  styleUrls: ['./dynamic-bar-deprecated.component.scss']
})
export class DynamicBarDeprecatedComponent implements OnInit {

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
