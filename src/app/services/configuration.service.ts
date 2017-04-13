import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';

@Injectable()
export class ConfigurationService{
  public baseUrl:string;
  constructor(){
    // this.baseUrl = "http://192.168.0.23:8080/StrategicPlanning";
    this.baseUrl = "http://192.168.1.4:8080/StrategicPlanning";
  }
}