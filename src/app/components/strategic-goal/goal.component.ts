import { Component, AfterViewInit, OnInit, AfterViewChecked } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrganizationService2 } from '../../providers/organization.service2';
import { DataService } from '../../services/data.service';
import { CommonService } from '../../providers/common.service';

declare let $;
@Component({
  selector: 'strategic-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],

})
export class StrategicGoal implements OnInit{
  public objectives = [];
  addGoalForm: boolean = false;
  public goalForm: FormGroup;
  public cycle = [];
  public orgId;
  public orgInfo;
  constructor(public goalService: GoalService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public orgService: OrganizationService2,
    public commonService: CommonService,
    public dataservice: DataService) {
    this.route.params.subscribe(param => {
      if (param['orgId']) this.orgId = param['orgId'];
    });
    let cycleId = commonService.getData('org_info')[0].cycles.id;
    console.log("DSDA", cycleId);
    this.orgService.fetchObjectives(this.orgId,cycleId).subscribe(response =>{
      if(response.status === 204) {
        this.objectives = [];
      } else {
        this.objectives = response;
      }
    },error =>{

    });
    this.initializeGoalForm();
  }
  initializeGoalForm(){
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
  onSubmit() {
    console.log(this.goalForm.value);
    this.orgService.addObjective(this.orgId, this.commonService.getData('org_info')[0].cycles.id, this.goalForm.value).subscribe(response => {
      this.returnedObject = response;
      this.objectives.push(this.returnedObject);
      this.initializeGoalForm();
    }, (error) => {
      console.log(error);
    });
  }
}