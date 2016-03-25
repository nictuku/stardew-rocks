/// <reference path="../../typings/main.d.ts"/>
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import 'lodash';
import moment from 'moment';

export interface Farm {
  ID: string,
  Name: string,
  Farmer: string,
  Likes: number,
  LastUpdate: Date,
  Thumbnail: string,
  History: string
};

@Injectable()
export class FarmService {
  constructor(private _http: Http){};

  getFarms () {
    return new Promise((resolve, reject) => {
      this._http.get("api/farms")
        .subscribe(res => {
          resolve(_(res.json()).map((farm: Farm) => {
            farm.LastUpdate = moment(farm.LastUpdate).toDate();
            return farm;
          }));
        });
    });
  }

  getFarm (id: string) {
    return new Promise((resolve, reject) => {
      this._http.get(`api/farm/${id}`)
        .subscribe(res => {
          var farm: Farm = res.json();
          farm.LastUpdate = moment(farm.LastUpdate).toDate();
          resolve(farm);
        });
    });
  }
};
