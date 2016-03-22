/// <reference path="../../typings/main.d.ts"/>

import {Component} from 'angular2/core';
import * as _ from 'lodash';
//import * as Fuse from 'fuse.js';

import {SearchBarComponent} from './searchBar.ts';
import {FarmService, Farm} from '../farm/farm.service.ts';
import {FarmThumbnailComponent} from './farmThumbnail.ts';

@Component({
  selector: 'home',
  template: `
    <searchBar (queryChange)="queryChange($event)"></searchBar>
    <div class="row">
      <div class="col m6 l4" *ngFor="#farm of farms">
        <farmThumbnail [farm]="farm"></farmThumbnail>
      </div>
    </div>
  `,
  directives: [SearchBarComponent, FarmThumbnailComponent]
})
export class HomeComponent {
  farms: Farm[];

  constructor(private _service: FarmService){}

  ngOnInit () {
    this._service.getFarms().then(farms => this.farms = farms as Farm[]);
  }

  queryChange (query) {
    if (!_.isEmpty(query)) {
      this._service.getFarms().then(farms => {
        // this.farms = new Fuse(farms, { keys: ["name", "farmer"]})
        //   .search(query);
      });
    } else {
      this._service.getFarms().then(farms => this.farms = farms as Farm[]);
    }
  }
};
