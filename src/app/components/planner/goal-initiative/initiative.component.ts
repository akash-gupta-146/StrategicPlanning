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
    this.orgService.fetchInitiative(this.goalId)
    .subscribe(response =>{
      if (response.status === 204) {
        return;
      }
      console.log(response);
      this.initiatives = response;
    },error =>{
      console.log(error);
    });
    
  }

  public departmentIds = [];
  public department;
  selectDepartment(e){
    console.log(e);
    this.departmentIds = [];
    e.forEach(element => {
      this.departmentIds.push(element.id);
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