import { Component, AfterViewInit, OnInit, AfterViewChecked } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

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
  public spi;
  public targetDigital;
  public cycle = [2011, 2012, 2013];
  constructor(public goalService: GoalService, public formBuilder: FormBuilder) {
    this.goalService.getJSON().then(res => {
      this.objectives = res.json();
    });
    this.goalForm = this.formBuilder.group({
      "objective": ['', [Validators.required]],
      "spi": this.formBuilder.array([this.inItSpi()]),
    });
  }
  ngOnInit() {
  }
  ngAfterViewChecked() {
    // $('select').material_select();
  }
  inItSpi() {
    return this.formBuilder.group({
      "spii": ['', [Validators.required]],
      "measure": ['', [Validators.required]],
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
    const control = <FormArray>this.goalForm.controls['spi'];
    control.push(this.inItSpi());
  }
  removeSpi(index) {
    const control = <FormArray>this.goalForm.controls['spi'];
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
    this.goalForm.reset();
    this.goalForm.removeControl;
  }
  ngAfterViewInit() {
    $('.collapsible').collapsible();
  }
}