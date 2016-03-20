import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'navbar',
  template: `
    <nav>
      <div class="nav-wrapper">
        <a [routerLink]="['Home']" class="brand-logo">StardewRocks</a>
      </div>
    </nav>
  `,
  directives: [RouterLink]
})
export class NavbarComponent {

};
