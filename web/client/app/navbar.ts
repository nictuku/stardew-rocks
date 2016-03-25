import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'navbar',
  styles: [`
    .padded {
      padding-left: 1rem;
    }
    .logo {
      vertical-align: text-bottom;
      height: 40px;
      width: 40px;
      pointer-events: none;
      cursor: pointer;
    }
  `],
  template: `
    <nav>
      <div class="nav-wrapper deep-orange darken-2">
        <a [routerLink]="['Home']" class="brand-logo padded left">
          <object class="logo" type="image/svg+xml" data="content/logo.svg"></object>
          StardewRocks
        </a>
      </div>
    </nav>
  `,
  directives: [RouterLink]
})
export class NavbarComponent {

};
