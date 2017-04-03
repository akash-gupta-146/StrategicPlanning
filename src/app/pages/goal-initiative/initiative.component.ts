import { Component, AfterViewInit, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GoalService } from '../../services/goal.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
declare let $;

@Component({
  selector: 'goal-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class GoalInitiative implements AfterViewInit, AfterViewChecked {
  public selectedGoal;
  public cycle = [2011, 2012, 2013];
  public goalId;
  public goals = [];
  initiativeForm: FormGroup;
  constructor(private route: ActivatedRoute, private goalService: GoalService, public formBuilder: FormBuilder) {
    this.initiativeForm = this.formBuilder.group({
      "initiative": ['', [Validators.required]],
      "activities": this.formBuilder.array([this.setActivity()]),
    });
    this.route.params.subscribe(param => {
      if (param['goalId']) this.goalId = param['goalId'];
    });
    this.goalService.getJSON().then(res => {
      this.goals = res.json();
      this.goals.forEach(element => {
        if (element.id == this.goalId) {
          this.selectedGoal = element;
        }
      });
    })
  }
  ngAfterViewInit() {
    // $('select').material_select();
  }
  ngAfterViewChecked() {
    // $('select').material_select();
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
      "measure":['',[Validators.required]],
      "frequency": [1, [Validators.required]],
      "unit": ['', [Validators.required]],
      "currentLevel": ['', [Validators.required]],
      "anualTarget": this.formBuilder.array(this.setAnualTarget())
    });
  }
  setAnualTarget() {
    const anualTarget = [];
    this.cycle.forEach(element => {
      anualTarget.push(this.inItTarget(element));
    });
    return anualTarget;
  }
  inItTarget(year) {
    return this.formBuilder.group({
      "year": [year, [Validators.required]],
      "levels": this.formBuilder.array([this.inItLevels()]),
      "cost": ['',[Validators.required]]
    });
  }
  setTargetTable(form, e) {
    for (var index = 0; index < this.cycle.length; index++) {
      form[index].controls['levels'] = this.formBuilder.array([]);
      const levels = <FormArray>form[index].controls['levels'];
      for (var i = 0; i < e; i++) {
        levels.push(this.inItLevels());
      }
    }
  }
  inItLevels() {
    return this.formBuilder.group({
      "level": ['', [Validators.required]]
    });
  }
}