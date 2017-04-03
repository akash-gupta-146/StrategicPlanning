import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';

@Injectable()
export class ConfigurationService{
  public baseUrl:string;
  constructor(){
    this.baseUrl = "http://localhost:8080/StrategicPlanning";
  }
}