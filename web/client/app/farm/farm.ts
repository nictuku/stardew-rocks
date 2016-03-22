import {Component, ElementRef} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {Farm, FarmService} from './farm.service.ts';

@Component({
  selector: 'farm',
  host: {
    'class': 'farm'
  },
  styles: [`
    :host(.farm), .container {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .meta {
      padding-top: 1rem;
      line-height: 2rem;
    }
    .sub-title {
      font-size: 1rem;
    }
    .history-row {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 1rem;
    }
    .history {
      position: absolute;
      max-height: 100%;
      top: 0;
      width: 100%;
      background-color: #dddddd;
    }
  `],
  template: `
    <div class="container">
      <div class="card">
        <div class="card-content">
          <span class="card-title">
            {{farm?.name}} Farm
            <span class="sub-title">by {{farm?.farmer}}</span>
            <a class="btn waves-effect waves-light right orange lighten-1">
              <i class="material-icons">star_border</i>
              {{farm?.likes}}
            </a>
          </span>
          <p>
            Last Updated: {{farm?.lastUpdate | date: 'medium'}}
          </p>
        </div>
        <div class="card-action">
          <a (click)="playPause()">Play/Pause</a>
          <a>Export GIF</a>
        </div>
      </div>
      <div class="history-row">
        <video class="history" [poster]="farm?.thumbnail" autoplay loop muted>
          <source [src]="farm?.history">
          <p class="warning">Your browser does not support HTML5 video.</p>
        </video>
      </div>
    </div>
  `
})
export class FarmComponent {
  farm: Farm;
  historyEl: HTMLVideoElement;

  constructor(
    private _service: FarmService,
    private _routeParams: RouteParams,
    private _element: ElementRef
  ){}

  ngOnInit () {
    this._service.getFarm(this._routeParams.get('id')).then(farm => this.farm = farm as Farm);
    this.historyEl = this._element.nativeElement.getElementsByTagName("video")[0];
  }

  playPause () {
    if (this.historyEl.paused) {
      this.historyEl.play();
    } else {
      this.historyEl.pause();
    }
  }
};
