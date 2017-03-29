import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GoalService {
  public goals = [];
  constructor(public http: Http) {
    this.getJSON().then(res => {
      this.goals = res.json();
    });
  }
  public getJSON() {
    return this.http.get("./app/services/goal.json")
      .toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
}