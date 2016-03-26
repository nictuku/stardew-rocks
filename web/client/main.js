// angular2 stuff
import 'es6-promise';
import 'es6-shim';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'reflect-metadata';
import 'font-awesome/css/font-awesome.min.css!';

// extra stuff
import 'angular2-materialize';

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {AppComponent} from './app/app';

bootstrap(AppComponent, [ROUTER_PROVIDERS]);
