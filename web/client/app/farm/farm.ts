import {Component, ElementRef} from 'angular2/core';
import {RouteParams} from 'angular2/router';

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
    .history-row {
      position: relative;
      //display: flex;
    }
    // .history {
    //   max-height: 100%;
    //   max-width: 100%;
    // }
    .play-pause-btn {
      position: absolute;
      top: 0;
      left: 0;
    }
  `],
  template: `
    <div class="container">
      <div class="row">
        <div class="meta">
          <span class="name">{{farm?.name}} Farm</span>
          <span class="farmer">by {{farm?.farmer}}</span>
        </div>
      </div>
      <div class="row history-row">
        <video class="history responsive-video" [poster]="farm?.thumbnail" autoplay loop muted>
          <source [src]="farm?.history">
          <p class="warning">Your browser does not support HTML5 video.</p>
        </video>
        <a class="waves-effect waves-light btn play-pause-btn" (click)="playPause()">Play/Pause</a>
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
