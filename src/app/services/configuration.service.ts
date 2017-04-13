import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ConfigurationService {
  private headers;
  public baseUrl: string;
  constructor() {
    this.baseUrl = "https://strategic-planning.appspot.com";
    // this.baseUrl = "http://localhost:8080/StrategicPlanning";
  }
  getHeaderWithWeb() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    var options = new RequestOptions({
      headers: this.headers
    });
    return options;
  }
}