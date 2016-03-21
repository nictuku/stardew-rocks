/// <reference path="../../../typings/tsd.d.ts" />
import {Injectable} from 'angular2/core';

interface FarmImage {
  date: Date,
  url: string
};

export class Farm {
  public thumbnail: FarmImage;
  constructor(
    public id: string,
    public name: string,
    public farmer: string,
    public likes: number,
    public images: FarmImage[]
  ){
    this.thumbnail = this.images[0];
  }
};

@Injectable()
export class FarmService {
  getFarms () { return farmsPromise; }

  getFarm (id: string) {
    return farmsPromise.then(farms => farms.filter(f => f.id == id)[0]);
  }
};

var Farms = [
  new Farm("PomegranateMitchel", "Pomegranate", "Mitchel", 5, [{
      date: new Date(), url: "content/farms/map-Mitchel-1458449416.png"
    }, {
      date: new Date(), url: "content/farms/map-Mitchel-1458442373.png"
    }, {
      date: new Date(), url: "content/farms/map-Mitchel-1458425848.png"
    }, {
      date: new Date(), url: "content/farms/map-Mitchel-1458411970.png"
  }])
];

var farmsPromise = Promise.resolve(Farms);
