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
    return this.http.post(this.baseUrl + "/planner/organization/1/initialSetup", data).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  fetchOrganizationInfo() {
    var options = this.conf.getHeaderWithWeb();
    return this.http.get(this.baseUrl + "/organization", options).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  fetchOrganizationInfoById(id) {
    return this.http.get(this.baseUrl + "/organization/" + id).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  addObjective(orgId, cycleId, objective) {
    var options = this.conf.getHeaderWithWeb();
    return this.http.post(this.baseUrl + "/planner/organization/" + orgId + "/cycle/" + cycleId + "/objective", objective, options).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }  
  fetchObjectives(orgId,cycleId){
    return this.http.get(this.baseUrl + "/planner/organization/" + orgId + "/cycle/" + cycleId + "/objective")
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  addInitiative(organizationId, cycleId, goalId, initiative) {
    return this.http.post(this.baseUrl + "/planner/organization/" + organizationId + "/cycle/" + cycleId + "/objective/" + goalId + "/initiative", initiative)
      .toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  fetchInitiative(organizationId, cycleId, goalId){
    return this.http.get(this.baseUrl + "/planner/organization/" + organizationId + "/cycle/" + cycleId + "/objective/" + goalId + "/initiative")
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
}