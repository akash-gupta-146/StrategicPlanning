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
  public departmentIds = [];
  public object;
  constructor(private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private orgService: OrganizationService2,
    private commonService: CommonService) {
    this.object = this.commonService.getData("parent");
    console.log(this.object);
    this.route.params.subscribe(param => {
      if (param['goalId']) this.goalId = param['goalId'];
    }); 
    this.fetchInitiatives();   
  }

  public fetchInitiatives(){
    this.orgService.fetchInitiative(this.goalId)
    .subscribe(response =>{
      if (response.status === 204) {
        return;
      }
      this.initiatives = response;
    },error =>{
      console.log(error);
    });
  }

  public assignActivity(activity:any){
    this.orgService.assignActivity(activity.id,this.departmentIds).subscribe((res:any) =>{
      activity.assignedDepartments = activity.assignedDepartments.concat(res);
      
      activity.otherDepartments.forEach((oelement,index) => {        
        this.departmentIds.forEach(ielement => {
          if(ielement == oelement.departmentId){
            if (index !== -1) {
              activity.otherDepartments.splice(index, 1);
            }
          }
        });
      });
    }, error =>{
      console.log(error);
    });
  }
  public shareInitiative(obj){
    this.commonService.storeData("parent",obj);
  }
}