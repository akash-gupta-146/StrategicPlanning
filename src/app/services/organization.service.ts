import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class OrganizationService {
  public baseUrl: string = "";
  constructor(private http: Http, private conf: ConfigurationService) {
    this.baseUrl = this.conf.baseUrl;
  }
  orgInitialSetup(data) {
    return this.http.post(this.baseUrl + "/planner/university/1/initialSetup", data).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  fetchOrganizationInfo() {
    var options = this.conf.getHeaderWithWeb();
    return this.http.get(this.baseUrl + "/university", options).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  fetchOrganizationInfoById(id) {
    return this.http.get(this.baseUrl + "/university/" + id).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  addObjective(orgId, cycleId, objective) {
    var options = this.conf.getHeaderWithWeb();
    return this.http.post(this.baseUrl + "/planner/university/" + orgId + "/cycle/" + cycleId + "/objective", objective, options).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }  
  fetchObjectives(orgId,cycleId){
    return this.http.get(this.baseUrl + "/planner/university/" + orgId + "/cycle/" + cycleId + "/objective")
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  addInitiative(universityId, cycleId, goalId, initiative) {
    return this.http.post(this.baseUrl + "/planner/university/" + universityId + "/cycle/" + cycleId + "/objective/" + goalId + "/initiative", initiative)
      .toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  fetchInitiative(universityId, cycleId, goalId){
    return this.http.get(this.baseUrl + "/planner/university/" + universityId + "/cycle/" + cycleId + "/objective/" + goalId + "/initiative")
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
}