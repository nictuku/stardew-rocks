import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {BrowserDomAdapter} from 'angular2/platform/browser';

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
        <video class="thumbnail" [poster]="farm?.thumbnail" autoplay loop muted>
          <source [src]="farm?.webm">
          <p class="warning">Your browser does not support HTML5 video.</p>
        </video>
      </div>
    </div>
  `,
  providers: [BrowserDomAdapter]
})
export class FarmComponent {
  farm: Farm;

  constructor(
    private _service: FarmService,
    private _routeParams: RouteParams,
    private _dom: BrowserDomAdapter
  ){}

  ngOnInit () {
    this._service.getFarm(this._routeParams.get('id')).then(farm => this.farm = farm as Farm);
  }
};
