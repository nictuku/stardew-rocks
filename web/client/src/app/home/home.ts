import {Component} from 'angular2/core';

import {SearchBarComponent} from './searchBar.ts';
import {FarmService, Farm} from '../farm/farm.service.ts';
import {FarmThumbnailComponent} from './farmThumbnail.ts';

@Component({
  selector: 'home',
  template: `
    <searchBar></searchBar>
    <div class="row">
      <div class="col m6" *ngFor="#farm of farms">
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
    this._service.getFarms().then(farms => this.farms = farms);
  }
};
