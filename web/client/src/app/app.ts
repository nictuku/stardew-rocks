import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

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

bootstrap(AppComponent, [ROUTER_PROVIDERS]);
