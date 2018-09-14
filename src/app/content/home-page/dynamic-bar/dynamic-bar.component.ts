import {AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {PlaybackService} from '../../../service/playback/playback.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-dynamic-bar',
  templateUrl: './dynamic-bar.component.html',
  styleUrls: ['./dynamic-bar.component.scss']
})
export class DynamicBarComponent implements OnInit, AfterContentChecked, AfterViewInit {

  constructor(private playbackService$: PlaybackService, private _cd: ChangeDetectorRef, private router: Router) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.routeUrl = e.url;
        console.log(this.routeUrl);
        console.log(this.routeUrl === '/editor');
      }
    });
  }

  routeUrl = '/editor';
  isConnected = false;
  temp = 0;

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%';

  // @ViewChild('vc', {read: ViewContainerRef}) private vc: ViewContainerRef;
  // @ViewChild('tpl', {read: TemplateRef}) private tpl: TemplateRef<any>;
  // private childViewRef: ViewRef;

  connectToServer() {
    this.playbackService$.hello().subscribe(it => {
      console.log(it);
    });
  }

  ngOnInit() {
    this.temp++;
  }

  ngAfterContentChecked() {
    this._cd.markForCheck();
  }

  ngAfterViewInit() {
    // this._cd.markForCheck();
    // setTimeout(() => {
    //   this._cd.detectChanges();
    // }, 0.5);
    // this.childViewRef = this.tpl.createEmbeddedView(null);
    // this.insertChildView();
    // setTimeout(() => {
    //   this.insertChildView();
    // }, 100);
  }

  // insertChildView() {
  //   this.vc.insert(this.childViewRef);
  // }
  //
  // removeChildView() {
  //   this.vc.detach();
  // }
  //
  // reloadChildView() {
  //   this.removeChildView();
  //   this.insertChildView();
  // }

  incrTemp() {
    this.temp++;
  }
}
