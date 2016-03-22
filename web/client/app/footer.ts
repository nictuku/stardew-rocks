import {Component} from 'angular2/core';

@Component({
  selector: 'footer',
  host: {
    'class': 'page-footer'
  },
  styles: [`
    :host(.page-footer) {
      padding-top: initial;
      margin-top: initial;
    }
  `],
  template: `
    <div class="footer-copyright">
      <div class="container">
      © 2014 Copyright Text
      <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
      </div>
    </div>
  `
})
export class FooterComponent {

};
