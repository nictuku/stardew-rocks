import {Component} from 'angular2/core';

@Component({
  selector: 'searchBar',
  template: `
    <div class="row">
      <form class="col s12">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">search</i>
                <input id="search" type="text" class="validate">
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
  query: string;
};
