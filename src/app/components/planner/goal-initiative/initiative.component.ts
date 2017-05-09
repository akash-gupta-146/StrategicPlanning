import { Component, AfterViewInit, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OrganizationService2 } from '../../../providers/organization.service2';
import { CommonService } from '../../../providers/common.service';
declare let $;

@Component({
  selector: 'goal-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class GoalInitiative{
  public goalId;
  public initiatives =[];
  constructor(private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private orgService: OrganizationService2,
    private commonService: CommonService) {
    
    this.route.params.subscribe(param => {
      if (param['goalId']) this.goalId = param['goalId'];
    });
    this.orgService.fetchInitiative(commonService.getData('org_info')[0].id, commonService.getData('org_info')[0].cycles.id,this.goalId)
    .subscribe(response =>{
      if (response.status === 204) {
        return
      }
      console.log(response);
      this.initiatives = response;
    },error =>{
      console.log(error);
    });
    
  }

  departmentIds = [];
  department;
  selectDepartment(e){
    e.forEach(element => {
      this.departmentIds.push(element.departmentId);
    });
    this.department = e;
    console.log(this.departmentIds);    
  }
  assignActivity(activityId,assignedDept){
    this.orgService.assignActivity(activityId,this.departmentIds).subscribe(res =>{
      console.log(res);
    });
  }
}