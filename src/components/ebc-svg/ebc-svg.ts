import { AfterViewInit, Component, ElementRef, Input, Renderer, ViewChild } from '@angular/core';
import { AppAvailability } from '@ionic-native/app-availability';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import { BackandItem } from '../../providers/backand';

@Component({
  selector: 'ebc-svg',
  templateUrl: 'ebc-svg.html'
})
export class EbcSvgComponent implements AfterViewInit {
  @ViewChild('myItem') myItem: ElementRef;
  @Input('ebc') item: BackandItem;
  @Input('style') type: string;

  constructor(private appAvail: AppAvailability, private appBrowser:InAppBrowser,
  private launch: LaunchNavigator, private platform: Platform, private render: Renderer) { }

 ngAfterViewInit() {
    this.clickCheck();
  }

  clickCheck() {
    let app = {};
    if (this.item.ready) {
      let my = this.myItem.nativeElement;

      this.render.listen(my, 'click', (e) => {
        let clicked = e.target['parentNode'];
        if (clicked['href']) {
          let link = clicked['href']['baseVal'];
          let attr = Array.from(clicked['attributes']);
          let data = attr[2]['value'];
          let insta = new RegExp('\w$');
          if (e.target['id'] === 'address') {
            e.preventDefault();
            this.launch.navigate(data)
              .then(
              success => console.log('Launched navigator'),
              error => console.log('Error launching navigator', error)
              );
          }
          if (link.includes('facebook')) {
            e.preventDefault();
            app = {
              appName: 'fb',
              url: link,
              appLink: `fb://${data}`
            };
            this.isAvail(app);
          };
          if (e.target['id'] === 'instagram' || e.target['id'] === 'ebc' || e.target['id'] === `insta${insta}`) {
            e.preventDefault();
            app = {
              appName: 'dm',
              url: link,
              appLink: `instagram://${data}`
            };
            this.isAvail(app);
          };
        };
      });
    }
  }

  isAvail(app: Object) {
    let myApp = app;
    let fb;
    let dm;
    let dom;

    if (this.platform.is('ios')) {
      fb = 'fb://';
      dm = 'instagram://';
    } else if (this.platform.is('android')) {
      fb = 'com.facebook.katana';
      dm = 'com.instagram.android';
    }
    if (myApp['appName'] === 'fb') {
      Object.defineProperty(myApp, 'check', {
        value: fb
      });
    }
    if (myApp['appName'] === 'dm') {
      Object.defineProperty(myApp, 'check', {
        value: dm
      });
    }

    this.appAvail.check(myApp['check'])
      .then(
      yes => {
        dom = this.appBrowser.create(myApp['appLink'], '_system');
      },
      no => {
        dom = this.appBrowser.create(myApp['url'], '_system');
      });
  }
}