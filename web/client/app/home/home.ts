/// <reference path="../../typings/main.d.ts"/>

import {Component} from 'angular2/core';
import 'lodash';

import {SearchBarComponent} from './searchBar.ts';
import {FarmService, Farm} from '../farm/farm.service.ts';
import {FarmThumbnailComponent} from './farmThumbnail.ts';

@Component({
  selector: 'home',
  template: `
    <div class="container">
      <searchBar (queryChange)="queryChange($event)"></searchBar>
      <div class="row results">
        <div class="col m6 l4" *ngFor="#farm of farms">
          <farmThumbnail [farm]="farm"></farmThumbnail>
        </div>
        <div class="col m12" *ngIf="farms?.length < 1">
          <div class="card-panel">
            No results found
          </div>
        </div>
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
    console.log(_)
  }

  queryChange (query) {
    if (!_.isEmpty(query)) {
      this._service.getFarms().then(farms => {
         this.farms = new Fuse(farms, { keys: ["name", "farmer"]})
           .search(query);
      });
    } else {
      this._service.getFarms().then(farms => this.farms = farms as Farm[]);
    }
  }
};
