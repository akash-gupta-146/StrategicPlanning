import {Component, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { OrganizationService } from '../../services/organization.service';
declare let $;
@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit{
  cmvvForm:FormGroup;
  constructor(public formBuilder:FormBuilder, public orgService : OrganizationService){
    this.cmvvForm = this.formBuilder.group({
      startCycle: ['', Validators.required],
      endCycle: ['', [Validators.required]],
      mission:['', [Validators.required]],
      vision:['', [Validators.required]],
      values: this.formBuilder.array([this.inItValue()])
    });
    this.getOrganizationInfo();
  }
  ngAfterViewInit(){
    
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
  returnObject;
  submitted:boolean = false;
  onSubmit(){
    console.log(this.cmvvForm.value);
    this.cmvvForm.value['cycles'] = [];
    this.cmvvForm.value.cycles.push({
      "startCycle":this.cmvvForm.value.startCycle,
      "endCycle": this.cmvvForm.value.endCycle
    });
    delete this.cmvvForm.value['startCycle'];
    delete this.cmvvForm.value['endCycle'];
    this.orgService.orgInitialSetup(this.cmvvForm.value).then(res =>{
      this.returnObject = res.json();
      this.submitted = true;
    },(error)=>{
      console.log(error);
    })
  }
  organizationInfo = [];
  getOrganizationInfo(){
    this.orgService.fetchOrganizationInfo().then(res =>{
      console.log(res.json());
      this.organizationInfo = res.json();
    },(error)=>{
      this.organizationInfo = [];
      console.log(error);
    })
  }
}
