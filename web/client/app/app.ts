///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';

import {NavbarComponent} from './navbar.ts';
import {FooterComponent} from './footer.ts';
import {HomeComponent} from './home/home.ts';
import {FarmComponent} from './farm/farm.ts';

import {FarmService} from './farm/farm.service.ts';

@Component({
  selector: 'app',
  styles:[`
    .app {
      min-height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    main {
      overflow: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  `],
  template: `
    <div class="app">
      <header class="navbar-fixed">
        <navbar></navbar>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer></footer>
    </div>
  `,
  directives: [NavbarComponent, FooterComponent, ROUTER_DIRECTIVES],
  providers: [FarmService, HTTP_PROVIDERS]
})
@RouteConfig([
  {path: '/', name: 'Home', component: HomeComponent, useAsDefault: true},
  {path: '/farm/:id', name: 'Farm', component: FarmComponent},
  {path: '/client', name: 'Client', component: HomeComponent}
])
export class AppComponent {

};
