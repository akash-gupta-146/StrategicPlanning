import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrganizationService2 } from '../../../providers/organization.service2';
import { CommonService } from '../../../providers/common.service';
@Component({
  selector: 'new-goal',
  templateUrl: './new.goal.component.html'
})
export class NewGoalComponent {
  addGoalForm: boolean = false;
  public goalForm: FormGroup;
  public cycle = [];

  public orgInfo;
  constructor(public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public orgService: OrganizationService2,
    public commonService: CommonService) {
    this.initializeGoalForm();
  }
  initializeGoalForm() {
    this.goalForm = this.formBuilder.group({
      "objective": ['', [Validators.required]],
      "totalCost": ['', [Validators.required]],
      "spis": this.formBuilder.array([this.inItSpi()]),
    });
  }
  ngOnInit() {
    this.cycle = this.commonService.getData('org_info')[0].cycle;
  }


  inItSpi() {
    return this.formBuilder.group({
      "spi": ['', [Validators.required]],
      "measureUnit": ['', [Validators.required]],
      "currentLevel": ['', [Validators.required]],
      "targetDigital": this.formBuilder.array(this.inItTarget()),
    });
  }

  inItTargetDigital(year) {
    return this.formBuilder.group({
      "year": [year, [Validators.required]],
      "level": ['', [Validators.required]],
    });
  }

  addSpi() {
    const control = <FormArray>this.goalForm.controls['spis'];
    control.push(this.inItSpi());
    console.log(this.goalForm.value);
  }

  removeSpi(index) {
    const control = <FormArray>this.goalForm.controls['spis'];
    control.removeAt(index);
  }

  inItTarget() {
    const fa = [];
    this.commonService.getData('org_info')[0].cycle.forEach(element => {
      fa.push(this.inItTargetDigital(element));
    });
    return fa;
  }

  returnedObject;
  orgId;
  onSubmit() {
    this.orgId = this.commonService.getData('org_info')[0].id;
    this.orgService.addObjective(this.orgId, this.commonService.getData('org_info')[0].cycles.id, this.goalForm.value).subscribe(response => {
      this.returnedObject = response;
      // this.objectives.push(this.returnedObject);
      this.initializeGoalForm();
    }, (error) => {
      console.log(error);
    });
  }
}