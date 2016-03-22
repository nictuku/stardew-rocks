import {Component, Input, SimpleChange, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'searchBar',
  styles: [`
    .search {
      padding-top: 1rem;
    }
  `],
  template: `
    <form class="search" materialize>
      <div class="input-field">
        <i class="material-icons prefix">search</i>
        <input id="search" type="text" (input)="queryChange.next($event.target.value)">
        <label for="search">Search for Farms or Farmers</label>
      </div>
    </form>
  `
})
export class SearchBarComponent {
  @Output() queryChange = new EventEmitter();
};
