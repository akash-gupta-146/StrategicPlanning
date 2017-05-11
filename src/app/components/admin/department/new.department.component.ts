import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { OrganizationService2 } from '../../../providers/organization.service2';
@Component({
  selector:'new-department',
  templateUrl:'./new.department.component.html',
  styleUrls:['./new.department.component.css']
})
export class NewDepartment{
  public newDepartment: FormGroup;
  constructor(public formBuilder: FormBuilder,
              public orgServ:OrganizationService2){

              this.newDepartment = this.formBuilder.group({
                "name": ['', [Validators.required]]
              });
  }
  onSubmit(){
    this.orgServ.addDepartment(1,this.newDepartment.value).subscribe(res =>{
      console.log(res);
    }, err =>{
      console.log(err);
    })
  }
}