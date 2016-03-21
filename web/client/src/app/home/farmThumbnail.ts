import {Component, Input} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Farm} from '../farm/farm.service.ts';

@Component({
  selector: 'farmThumbnail',
  styles: [`
    .thumbnail {
      width: 100%;
    }
  `],
  template: `
    <div class="card">
      <a [routerLink]="['Farm', {id: farm.id}]">
        <div class="card-content">
          <span class="card-title">{{farm.name}} Farm</span>
          <img class="thumbnail" [src]="farm.thumbnail.url" >
        </div>
      </a>
    </div>
  `,
  directives: [RouterLink]
})
export class FarmThumbnailComponent {
  @Input() farm: Farm;
};
