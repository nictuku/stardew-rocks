import {Component, ElementRef} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {NgStyle} from 'angular2/common';

import {Farm, FarmService} from './farm.service.ts';
import {MaterializeDirective} from 'angular2-materialize';

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
      min-height: 200px;
      top: 0;
      width: 100%;
    }
    .card-action > a {
      cursor: pointer;
    }
  `],
  template: `
    <div class="container">
      <div class="card meta">
        <div class="card-content">
          <span class="card-title">
            {{farm?.Name}} Farm
            <span class="sub-title hide-on-small-only">by {{farm?.Farmer}}</span>
            <a class="btn waves-effect waves-light right orange lighten-1 hide-on-small-only">
              <i class="material-icons">star_border</i> {{farm?.Likes}}
            </a>
          </span>
          <div class="sub-title hide-on-med-and-up">Farmer: {{farm?.Farmer}}</div>
          <div>
            Last Updated: {{farm?.LastUpdate | date: 'medium'}}
          </div>
          <div class="hide-on-med-and-up" style="font-size: 1.6rem;">
            <a class="btn waves-effect waves-light orange lighten-1">
              <i class="material-icons">star_border</i> {{farm?.Likes}}
            </a>
          </div>
        </div>
        <div class="card-action">
          <a (click)="playPause()">{{historyEl.paused ? 'Play' : 'Pause'}}</a>
        </div>
      </div>
      <div class="history-row">
        <video class="history deep-orange lighten-5" materialize="materialbox" [poster]="farm?.Thumbnail" autoplay loop muted
        (click)="historyClicked = !historyClicked"
        [ngStyle]="historyClicked ? historyExpandedStyle : null" >
          <source [src]="farm?.History">
          <p class="warning">Your browser does not support HTML5 video.</p>
        </video>
      </div>
    </div>
  `,
  directives: [MaterializeDirective, NgStyle]
})
export class FarmComponent {
  farm: Farm;
  historyEl: HTMLVideoElement;
  historyClicked = false;
  historyExpandedStyle = {
    "max-height": "initial",
    "background-color": "initial"
  };

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
