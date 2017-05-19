import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AdminService } from '../../../providers/admin.service';
declare let $;
@Component({
  selector:'new-department',
  templateUrl:'./new.department.component.html',
  styleUrls:['./new.department.component.css']
})
export class NewDepartment{
  public universities = [];
  public newDepartment: FormGroup;
  constructor(public formBuilder: FormBuilder,
              public adminService:AdminService){
              
              adminService.getUniversity().subscribe(response =>{
                if (response.status === 204) {
                  this.universities = [];
                  alert("There is not Universities Entry yet.\nFirst Feed the entries of University");
                } else {
                  console.log(response);
                  this.universities = response;
                }
              }, err =>{
                this.universities = [];
                console.log(err);
              });

              this.newDepartment = this.formBuilder.group({
                "department": ['', [Validators.required]],
                "universityId": ['', [Validators.required]],
                
              });
  }
  onSubmit(){
    this.adminService.addDepartment(this.newDepartment.value).subscribe(res =>{
      $('#deptModal').modal('show');
      this.newDepartment.reset();
      console.log(res);
    }, err =>{
      console.log(err);
    })
  }
}