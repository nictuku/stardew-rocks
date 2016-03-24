import {Component, Input} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Farm} from '../farm/farm.service.ts';

@Component({
  selector: 'farmThumbnail',
  styles: [`
    .farm-thumbnail {
      width: 350px;
      height: 284px;
    }
    .card-title {
      background-color: rgba(100, 100, 100, .5);
      right: 0;
      line-height: 2rem;
    }
    .sub-title {
      font-size: 1rem;
    }
  `],
  template: `
    <div class="card hoverable">
      <a [routerLink]="['Farm', {id: farm.ID}]">
        <div class="card-image">
          <img class="responsive-img" [src]="farm.Thumbnail + '?w=350'" >
          <span class="card-title">
            {{farm.Name}} Farm
            <div class="sub-title">by {{farm.Farmer}}</div>
          </span>
        </div>
      </a>
    </div>
  `,
  directives: [RouterLink]
})
export class FarmThumbnailComponent {
  @Input() farm: Farm;
};
