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
  public departments = [];
  public newDepartment: FormGroup;
  constructor(public formBuilder: FormBuilder,
              public adminService:AdminService){
              adminService.getDepartments().subscribe(response =>{
                if (response.status === 204) {
                  this.departments = [];
                  alert("There is not Departments Entry yet.\nFirst Feed the entries of Departments");
                } else {
                  console.log(response);
                  this.departments = response;
                }
              }, err =>{
                this.departments = [];
                console.log(err);
              });
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
                "parentDepartmentId":['',[Validators.required]],
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