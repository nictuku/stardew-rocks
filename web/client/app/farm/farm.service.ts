/// <reference path="../../typings/main.d.ts"/>
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';

export interface Farm {
  id: string,
  name: string,
  farmer: string,
  likes: number,
  lastUpdate: Date,
  thumbnail: string,
  history: string
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
