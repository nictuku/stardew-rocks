/// <reference path="../../typings/main.d.ts"/>
import {Injectable} from 'angular2/core';

export interface Farm {
  id: string,
  name: string,
  farmer: string,
  likes: number,
  lastUpdate: Date,
  thumbnail: string,
  webm: string
};

@Injectable()
export class FarmService {
  getFarms () { return farmsPromise; }

  getFarm (id: string) {
    return farmsPromise.then(farms => farms.filter(f => f.id == id)[0]);
  }
};

var Farms = [{
  id: "PomegranateMitchel",
  name: "Pomegranate",
  farmer: "Mitchel",
  likes: 5,
  lastUpdate: new Date(),
  thumbnail: "content/farms/map-Mitchel-1458449416.png",
  webm: ""
}, {
  id: "FarmRey",
  name: "Farm",
  farmer: "Rey",
  likes: 5,
  lastUpdate: new Date(),
  thumbnail: "content/farms/map-Rey-1458460624.png",
  webm: "content/farms/Rey.webm"
}];

var farmsPromise = Promise.resolve(Farms);
