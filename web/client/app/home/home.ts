/// <reference path="../../typings/main.d.ts"/>

import {Component} from 'angular2/core';
import * as _ from 'lodash';
import Fuse from 'fuse.js';

import {SearchBarComponent} from './searchBar.ts';
import {FarmService, Farm} from '../farm/farm.service.ts';
import {FarmThumbnailComponent} from './farmThumbnail.ts';

@Component({
  selector: 'home',
  template: `
    <div class="container">
      <searchBar (queryChange)="queryChange($event)"></searchBar>
      <div class="row results">
        <div class="col s12 center" *ngIf="loading">
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col m6 l4" *ngFor="#farm of farms">
          <farmThumbnail [farm]="farm"></farmThumbnail>
        </div>
        <div class="col s12" *ngIf="farms?.length < 1">
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
  loading = true;

  constructor(private _service: FarmService){}

  ngOnInit () {
    this._service.getFarms().then(farms => {
      this.loading = false;
      this.farms = farms as Farm[];
    });
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
