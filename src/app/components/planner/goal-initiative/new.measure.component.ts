import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../../providers/common.service';
import { OrganizationService2 } from '../../../providers/organization.service2';

declare let $;

@Component({
  selector: 'new-measure',
  templateUrl: './new.measure.component.html'
})
export class NewMeasure {
  public measureForm: FormGroup;
  public activityId;
  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private orgService: OrganizationService2,
    private _location: Location,
    private route: ActivatedRoute) {
    this.route.params.subscribe(param =>{
      if (param['activityId']) this.activityId = param['activityId'];
    })
    this.measureForm = this.setMeasure();
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
  submitMeasure(){
    this.measureForm.value['activityId'] = this.activityId;
    this.orgService.saveMeasure(this.measureForm.value).subscribe(response =>{
      this.measureForm = this.setMeasure();
      $('#measureModal').modal('show');
    }, error =>{
      console.log(error);
    });
  }
  goBack(){
    this._location.back();
  }
}