import {Component} from 'angular2/core';

import {SearchBarComponent} from './searchBar.ts';

@Component({
  selector: 'home',
  template: `
    <searchBar></searchBar>
  `,
  directives: [SearchBarComponent]
})
export class HomeComponent {

};
