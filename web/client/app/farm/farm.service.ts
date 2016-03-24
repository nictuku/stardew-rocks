/// <reference path="../../typings/main.d.ts"/>
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';

export interface Farm {
  Id: string,
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
          console.log(res.json());
          resolve(res.json());
        });
    });
  }

  getFarm (id: string) {
    return new Promise((resolve, reject) => {
      this._http.get(`api/farm/${id}`)
        .subscribe(res => {
          console.log(res.json());
          resolve(res.json());
        });
    });
  }
};
