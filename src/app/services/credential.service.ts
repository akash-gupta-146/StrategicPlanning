import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { ConfigurationService } from './configuration.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class CredentialService {
  public baseUrl: string = "";
  login: any = false;
  headers: any;
  access_token: string;
  public user = {
    username: "pankaj123",
    password: "pkj123456"
  };
  private loggedIn = false;
  constructor(private http: Http, private conf: ConfigurationService) {
    this.baseUrl = this.conf.baseUrl;
    this.loggedIn = !!localStorage.getItem('access_token');
  }

  resetLoginStatus() {
    this.login = false;
  }

  isLoggedIn() {
    let access_token = localStorage.getItem("org_info");
    if (access_token) {
      return !this.login;
    } else {
      return this.login;
    }
  }

  verifyUser(data: Object) {
    return this.http.post(this.baseUrl + "/login", data)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }
}