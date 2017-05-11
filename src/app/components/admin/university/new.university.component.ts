import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { OrganizationService2 } from '../../../providers/organization.service2';
@Component({
  selector:'new-university',
  templateUrl:'./new.university.component.html',
  styleUrls:['./new.university.component.css']
})
export class NewUniversity{
  public newUniversity: FormGroup;
  constructor(public formBuilder: FormBuilder,
              public orgServ:OrganizationService2){

              this.newUniversity = this.formBuilder.group({
                "name": ['', [Validators.required]]
              });
  }
  onSubmit(){
    this.orgServ.addUniversity(this.newUniversity.value).subscribe(res =>{
      console.log(res);
    }, err =>{
      console.log(err);
    })
  }
}