import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http } from '@angular/http';
import { CommonService } from './common.service';
import { CustomHttpService } from './default.header.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class OrganizationService2 {

  private baseUrl: string = "";

  constructor(public http: CustomHttpService,
              public con: CommonService) {
    this.baseUrl = con.baseUrl;
  }

  public fetchOrganizationInfo() {
    return this.http.get(this.baseUrl + "/university")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public fetchObjectives(orgId, cycleId) {
    return this.http.get(this.baseUrl + "/planner/university/" + orgId + "/cycle/" + cycleId + "/objective")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public addObjective(orgId, cycleId, objective) {
    return this.http.post(this.baseUrl + "/planner/university/" + orgId + "/cycle/" + cycleId + "/objective", objective)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public addInitiative(universityId, cycleId, goalId, initiative) {
    return this.http.post(this.baseUrl + "/planner/university/" + universityId + "/cycle/" + cycleId + "/objective/" + goalId + "/initiative", initiative)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public fetchInitiative(universityId, cycleId, goalId){
    return this.http.get(this.baseUrl + "/planner/university/" + universityId + "/cycle/" + cycleId + "/objective/" + goalId + "/initiative")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public fetchAssignedActivity(){
    return this.http.get("/hod/department/" + this.con.getData('user_departmentInfo')[0].departmentId+"/activity")
                    .map(this.extractData)
                    .catch(this.handleError); 
  }

  private extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || { };
  }


  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "Something is wrong.."`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}