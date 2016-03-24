/// <reference path="../../typings/main.d.ts"/>
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

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
    return this._http.get("api/farms")
      .map(res => <Farm[]>res.json().data)
      .catch(this.handleError)
      .toPromise();
  }

  getFarm (id: string) {
    return this._http.get(`api/farm/${id}`)
      .map(res => <Farm>res.json().data)
      .catch(this.handleError)
      .toPromise();
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
};
