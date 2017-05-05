import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ConfigurationService {
  private headers;
  public baseUrl: string;
  constructor() {
    this.baseUrl = "https://strategic-planning.appspot.com";
    // this.baseUrl = "http://192.168.1.4:8080/StrategicPlanning";
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
  getHeaderForFile(){
    this.headers = new Headers({
      // 'Content-Type': 'multipart/form-data',
      // 'Accept':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    var options = new RequestOptions({
      headers: this.headers
    });
    return options;
  }
}