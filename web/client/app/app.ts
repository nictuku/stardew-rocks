///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {NavbarComponent} from './navbar.ts';
import {HomeComponent} from './home/home.ts';
import {FarmComponent} from './farm/farm.ts';

import {FarmService} from './farm/farm.service.ts';

@Component({
  selector: 'app',
  template: `
    <navbar></navbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [NavbarComponent, ROUTER_DIRECTIVES],
  providers: [FarmService]
})
@RouteConfig([
  {path: '/', name: 'Home', component: HomeComponent, useAsDefault: true},
  {path: '/farm/:id', name: 'Farm', component: FarmComponent}
])
export class AppComponent {

};
