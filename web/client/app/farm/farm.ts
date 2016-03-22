import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {BrowserDomAdapter} from 'angular2/platform/browser';

import {Farm, FarmService} from './farm.service.ts';

@Component({
  selector: 'farm',
  styles: [`
    .meta {
      padding-top: 1rem;
      line-height: 2rem;
    }
    .meta .name {
      font-size: 2.5rem;
      display: block;
    }
    .meta .farmer {
      font-size: 1.5rem;
      display: block;
    }
    .history {
      width: 100%;
    }

  `],
  template: `
    <div class="row">
      <div class="meta">
        <span class="name">{{farm?.name}} Farm</span>
        <span class="farmer">by {{farm?.farmer}}</span>
      </div>
    </div>
    <div class="row">
      <video class="history" [poster]="farm?.thumbnail" autoplay loop muted>
        <source [src]="farm?.history">
        <p class="warning">Your browser does not support HTML5 video.</p>
      </video>
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
