import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {Farm, FarmService} from './farm.service.ts';

@Component({
  selector: 'farm',
  styles: [`
    .thumbnail {
      width: 100%;
    }
  `],
  template: `
    <div class="card">
      <div class="card-content">
        <span class="card-title">{{farm?.name}} Farm</span>
        <p>{{farm?.farmer}}</p>
        <img class="thumbnail" [src]="farm?.thumbnail?.url">
      </div>
    </div>
  `
})
export class FarmComponent {
  farm: Farm;

  constructor(
    private _service: FarmService,
    private _routeParams: RouteParams
  ){}

  ngOnInit () {
    this._service.getFarm(this._routeParams.get('id')).then(farm => this.farm = farm as Farm);
  }
};
