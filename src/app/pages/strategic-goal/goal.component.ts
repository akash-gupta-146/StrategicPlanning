import { Component, AfterViewInit, OnInit, AfterViewChecked } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';

declare let $;
@Component({
  selector: 'strategic-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class StrategicGoal implements AfterViewInit, OnInit, AfterViewChecked {
  public objectives;
  addGoalForm: boolean = false;
  public goalForm: FormGroup;
  public cycle = [2011, 2012, 2013];
  public orgId;
  public orgInfo;
  constructor(public goalService: GoalService, public formBuilder: FormBuilder, private route: ActivatedRoute, public orgService : OrganizationService) {
    this.route.params.subscribe(param => {
      if (param['orgId']) this.orgId = param['orgId'];
      console.log("orgId",this.orgId)
      this.orgService.fetchOrganizationInfoById(this.orgId).then(res =>{
        this.orgInfo = res.json();
      },(err)=>{
        console.log(err);
      })
    });
    this.goalService.getJSON().then(res => {
      this.objectives = res.json();
    });
    this.goalForm = this.formBuilder.group({
      "objective": ['', [Validators.required]],
      "totalCost": ['',[Validators.required]],
      "spis": this.formBuilder.array([this.inItSpi()]),
    });
  }
  ngOnInit() {
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
  inItTarget() {
    const fa = [];
    this.cycle.forEach(element => {
      fa.push(this.inItTargetDigital(element));
    });
    return fa;
  }
  onSubmit() {
    console.log(this.goalForm.value);
    this.orgService.addObjective(this.orgId,this.orgInfo.cycles[0].id,this.goalForm.value).then(response =>{
      console.log(response.json());
      this.goalForm.reset();
      this.goalForm.removeControl;
    },(error)=>{
      console.log(error);
    });
    
  }
  ngAfterViewInit() {
    $('.collapsible').collapsible();
  }
}