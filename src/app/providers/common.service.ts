import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CommonService {

  public baseUrl: string = "https://strategic-planning.appspot.com";

  constructor() { }

  public storeData(field_name, data) {
    // if(field_name === "org_info") {
    //   data[0]["cycles"] = null;
    // }
    localStorage.setItem(field_name, JSON.stringify(data));

  }

  public getData(field_name) {
    let data = JSON.parse(localStorage.getItem(field_name));
    if (data) {
      return data;
    }
  }

}