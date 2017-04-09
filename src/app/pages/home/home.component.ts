import {Component, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
declare let $;
@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit{
  cmvvForm:FormGroup;
  constructor(public formBuilder:FormBuilder){
    this.cmvvForm = this.formBuilder.group({
      cycleStartFrom: ['', Validators.required],
      cycleEndTo: ['', [Validators.required]],
      mission:['', [Validators.required]],
      vision:['', [Validators.required]],
      values: this.formBuilder.array([
      ])
    });
    const control = <FormArray>this.cmvvForm.controls['values'];
    control.push(this.inItValue());
  }
  ngAfterViewInit(){
    // $('select').material_select();
  }
  inItValue() {
    return this.formBuilder.group({
      "title": ['', Validators.required],
      "description": ['', Validators.required]
    });
  }
  removeValue(index){
    const control = <FormArray>this.cmvvForm.controls['values'];
    control.removeAt(index);
  }
  addValue(){
    const control = <FormArray>this.cmvvForm.controls['values'];
    control.push(this.inItValue());
  }
  onSubmit(){
    console.log(this.cmvvForm.value);
  }
}
