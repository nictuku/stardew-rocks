import {Component, Input, SimpleChange, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'searchBar',
  template: `
    <div class="row">
      <form class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Search for Farms or Farmers</span>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">search</i>
                <input id="search" type="text" [value]="query" (input)="queryChange.next($event.target.value)">
                <label for="search">Search</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  `
})
export class SearchBarComponent {
  query = "";
  @Output() queryChange = new EventEmitter();

  ngOnChanges(changes) {
    console.log("query", changes);
  }
};
