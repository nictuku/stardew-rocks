import {Component} from 'angular2/core';

@Component({
  selector: 'footer',
  host: {
    'class': 'page-footer orange accent-4'
  },
  styles: [`
    :host(.page-footer) {
      padding-top: initial;
      margin-top: initial;
    }
    .padded {
      padding: 1rem;
    }
  `],
  template: `
    <div class="footer-copyright">
      <div class="container">
        <span class="right">
          <a class="grey-text text-lighten-4 padded" href="https://discord.gg/0tpEyZrnOVQKA93b">
            Discord Channel
          </a>
          <a class="grey-text text-lighten-4 padded"
            href="https://github.com/nictuku/stardew-rocks">
            Github Page
          </a>
        </span>
      </div>
    </div>
  `
})
export class FooterComponent {

};
