import { Component, AfterViewInit, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OrganizationService2 } from '../../providers/organization.service2';
import { DataService } from '../../services/data.service';
import { CommonService } from '../../providers/common.service';
declare let $;

@Component({
  selector: 'goal-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class GoalInitiative implements AfterViewInit{
  public selectedGoal;
  public cycle = [];
  public orgId;
  public cycleId;
  public goalId;
  public goals = [];
  public initiatives =[];
  initiativeForm: FormGroup;
  constructor(private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private orgService: OrganizationService2,
    private commonService: CommonService,
    private dataservice: DataService) {
    this.initiativeForm = this.formBuilder.group({
      "initiative": ['', [Validators.required]],
      "totalCost": ['', [Validators.required]],
      "activities": this.formBuilder.array([this.setActivity()])
    });
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
    this.cycle = commonService.getData('org_info')[0].cycle;
  }
  ngAfterViewInit() {
    // $('.collapsible').collapsible();
  }
  addActivity() {
    const control = <FormArray>this.initiativeForm.controls['activities'];
    control.push(this.setActivity());
  }
  removeActivity(initiativeForm, i) {
    const control = <FormArray>this.initiativeForm.controls['activities'];
    control.removeAt(i);
  }
  addMeasure(form) {
    const control = <FormArray>form.controls['measures'];
    control.push(this.setMeasure());
  }
  removeMeasure(form, j) {
    const control = <FormArray>form.controls['measures'];
    control.removeAt(j);
  }
  setActivity() {
    return this.formBuilder.group({
      "activity": ['', [Validators.required]],
      "departments": ['', [Validators.required]],
      "measures": this.formBuilder.array([this.setMeasure()])
    });
  }
  setMeasure() {
    return this.formBuilder.group({
      "measure": ['', [Validators.required]],
      "frequencyId": [1, [Validators.required]],
      "measureUnit": ['', [Validators.required]],
      "currentLevel": ['', [Validators.required]],
      "annualTarget": this.formBuilder.array(this.setAnnualTarget())
    });
  }
  setAnnualTarget() {
    const annualTarget = [];
    this.cycle.forEach(element => {
      annualTarget.push(this.inItTarget(element));
    });
    return annualTarget;
  }
  inItTarget(year) {
    return this.formBuilder.group({
      "year": [year, [Validators.required]],
      "levels": this.formBuilder.array([this.inItLevels(1)]),
      "cost": ['', [Validators.required]]
    });
  }
  setTargetTable(form, e) {
    for (var index = 0; index < this.cycle.length; index++) {
      form[index].controls['levels'] = this.formBuilder.array([]);
      const levels = <FormArray>form[index].controls['levels'];
      for (var i = 0; i < e; i++) {
        levels.push(this.inItLevels(i + 1));
      }
    }
  }
  inItLevels(q) {
    return this.formBuilder.group({
      "quarter": [q + "quarter"],
      "level": ['', [Validators.required]]
    });
  }
  returnObject;
  submited:boolean = false;
  submitInitiative() {
    this.orgId = this.commonService.getData('org_info')[0].id;
    this.cycleId = this.commonService.getData('org_info')[0].cycles.id;
    delete this.initiativeForm.value['activities'][0].departments;
    console.log("object", this.initiativeForm.value);
    this.orgService.addInitiative(this.orgId, this.cycleId, this.goalId, this.initiativeForm.value).subscribe(res => {
      this.submited = true;
      this.initiatives.push(this.initiativeForm.value);
      this.returnObject = res;
      console.log("afsd", res);
    }, err => {
      console.log(err);
    });
  }
  addMoreInitiative(){
    this.initiativeForm.reset();
    this.submited = false;
  }
}