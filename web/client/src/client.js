import {Component, View} from 'angular2/core';

@Component({
  selector: 'client'
})

@View({
  templateUrl: 'client.html'
})

export class Client {

  constructor() {
    console.info('Client Component Mounted Successfully');
  }

}
