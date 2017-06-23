import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../../providers/common.service';
import { OrganizationService2 } from '../../../providers/organization.service2';
@Component({
  selector: 'new-activity',
  templateUrl: './new.activity.component.html'
})
export class NewActivity {
  activityForm: FormGroup;
  goalId;
  initiativeId;
  parent;
  constructor(public formBuilder: FormBuilder, 
              private commonService: CommonService,
              private _location: Location,
              private orgService: OrganizationService2,
              private route:ActivatedRoute) {
              this.parent = this.commonService.getData("parent")
              this.activityForm = this.setActivity();
                  this.route.params.subscribe(param => {
                    console.log(param);
                    if (param['goalId']) this.goalId = param['goalId'];
                    if (param['initiativeId']) this.initiativeId = param['initiativeId'];
                  });
  }
  setActivity() {
    return this.formBuilder.group({
      "activity": ['', [Validators.required]],
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
    this.commonService.getData('org_info')[0].cycle.forEach(element => {
      annualTarget.push(this.inItTarget(element));
    });
    return annualTarget;
  }
  inItTarget(year) {
    return this.formBuilder.group({
      "year": [year, [Validators.required]],
      "levels": this.formBuilder.array([this.inItLevels(1)]),
      "estimatedCost": ['', [Validators.required]]
    });
  }
  inItLevels(q) {
    return this.formBuilder.group({
      "quarter": [q + "quarter"],
      "startDate": ["2017-04-01"],
      "endDate": ["2018-04-15"],
      "estimatedTargetLevel": ['', [Validators.required]]
    });
  }
  setTargetTable(form, e) {
    for (var index = 0; index < this.commonService.getData('org_info')[0].cycle.length; index++) {
      form[index].controls['levels'] = this.formBuilder.array([]);
      const levels = <FormArray>form[index].controls['levels'];
      for (var i = 0; i < e; i++) {
        levels.push(this.inItLevels(i + 1));
      }
    }
  }
  removeMeasure(form, j) {
    const control = <FormArray>form.controls['measures'];
    control.removeAt(j);
  }
  addMeasure(form) {
    const control = <FormArray>form.controls['measures'];
    control.push(this.setMeasure());
  }
  submitActivity(){
    this.activityForm.value['initiativeId'] = this.initiativeId;
    this.orgService.saveActivity(this.activityForm.value)
    .subscribe(response =>{
      console.log(response);
      this._location.back();
    });    
  }
}