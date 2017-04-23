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
export class StrategicGoal implements AfterViewInit, OnInit, AfterViewChecked {
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
      this.objectives = response;
    },error =>{

    });
    // this.orgService.fetchOrganizationInfoById(this.orgId).then(res => {
    //   this.orgInfo = res.json();
    //   this.getCycle(this.orgInfo.cycles);
    //   console.log(this.orgInfo);
    // }, (err) => {
    //   console.log(err);
    // });
    this.goalForm = this.formBuilder.group({
      "objective": ['', [Validators.required]],
      "totalCost": ['', [Validators.required]],
      "spis": this.formBuilder.array([this.inItSpi()]),
    });
  }
  ngOnInit() {
    // this.orgInfo = this.dataservice.getObjective();
    this.cycle = this.commonService.getData('org_info')[0].cycle;
    console.log("DSADASDAS", this.cycle)
  }
  ngAfterViewChecked() {
    // $('select').material_select();
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
  }
  removeSpi(index) {
    const control = <FormArray>this.goalForm.controls['spis'];
    control.removeAt(index);
  }
  // getCycle(cycles) {
  //   var startYear = new Date(cycles[0].startCycle).getFullYear();
  //   var endYear = new Date(cycles[this.orgInfo.cycles.length - 1].endCycle).getFullYear();
  //   for (var y = startYear; y <= endYear; y++)
  //     this.cycle.push(y);
  // }
  inItTarget() {
    const fa = [];
    this.commonService.getData('org_info')[0].cycle.forEach(element => {
      fa.push(this.inItTargetDigital(element));
    });
    return fa;
  }
  resetForm() {
    this.goalForm.controls['objective'].reset();
    this.goalForm.controls['totalCost'].reset();
    this.goalForm.controls['spis'] = this.formBuilder.array([this.inItSpi()]);
  }
  returnedObject;
  submited: boolean = false;
  onSubmit() {
    console.log(this.goalForm.value);
    this.orgService.addObjective(this.orgId, this.orgInfo.cycles[0].id, this.goalForm.value).subscribe(response => {
      this.returnedObject = this.goalForm.value;
      this.objectives.push(this.returnedObject);
      this.resetForm();
      this.submited = true;
    }, (error) => {
      console.log(error);
    });
  }
  addMoreObjective() {
    this.submited = false;
  }
  ngAfterViewInit() {
    
  }
}