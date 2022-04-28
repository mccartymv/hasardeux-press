import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  navStart: Observable<NavigationStart>;
  navEnd: Observable<NavigationEnd>;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
                this.navStart = router.events.pipe(
                  filter(event => event instanceof NavigationStart)
                  ) as Observable<NavigationStart>;
                this.navEnd = router.events.pipe(
                  filter(evt => evt instanceof NavigationEnd)
                  ) as Observable<NavigationEnd>;
              }

  ngOnInit() {

    this.navStart.subscribe(event => {
      if (this.router.url === '/product-templates') {
        console.log('Are You Sure You Want To Leave /product-templates page?');
      }
    });
    this.navEnd.subscribe(evt => {

    });
  }
}
