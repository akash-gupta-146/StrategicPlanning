import {Component, AfterViewInit} from '@angular/core';
import {OrganizationService2} from '../../providers/organization.service2';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CommonService } from '../../providers/common.service';

declare let $:any;

@Component({
  selector:'coordinator-home',
  templateUrl:'./coordinator.component.html',
  styleUrls:['./coordinator.component.css']
})
export class CoordinatorHome implements AfterViewInit{
  public assignedActivities = [];
  public resultForm:FormGroup;
  public evidencForm:FormGroup;
  constructor(private orgSer:OrganizationService2,private cs:CommonService){
    this.resultForm = new FormGroup({
      currentLevel:new FormControl('',[Validators.required]),
      currentCost:new FormControl('',[Validators.required])
    });
    this.evidencForm = new FormGroup({
      title:new FormControl('',[Validators.required]),
      description:new FormControl('',Validators.required),
      files:new FormControl('',[Validators.required])
    });

    orgSer.fetchAssignedActivity().subscribe((res:any)=>{
      console.log(res);
      this.assignedActivities = res;
    }, (err:any)=>{
      this.assignedActivities = [];
    })
  }

  ngAfterViewInit(){

  }
  selectedQuarter:any;
  
  selectQuarter(lev){
    this.resultForm = new FormGroup({
      currentLevel:new FormControl('',[Validators.required]),
      currentCost:new FormControl('',[Validators.required])
    });
    this.selectedQuarter = lev;    
  }

  attachEvidence(lev){
    
    this.selectedQuarter = lev;
    this.evidencForm = new FormGroup({
      title:new FormControl('',[Validators.required]),
      description:new FormControl('',Validators.required),
      files:new FormControl('',[Validators.required])
    });
  }
  file:any;
  getFile(event) {
    this.file = event.srcElement.files[0];
    console.log(event.srcElement.files[0]);
  }

  onResultSubmit(){
    this.resultForm.value["quarterId"] = this.selectedQuarter.id;
    this.resultForm.value["departmentId"] = this.cs.getData("user_roleInfo")[0].departmentId;
    console.log(this.resultForm.value);
    this.orgSer.saveQuarteResult(this.resultForm.value,this.selectedQuarter.id).subscribe((res:any)=>{
      console.log("success");
    })
  }

  onEvidenceSubmit(){
    let formData = new FormData();
    formData.append('title',this.evidencForm.value['title']);
    formData.append('description',this.evidencForm.value['description']);
    formData.append('file',this.file);
    console.log(this.evidencForm.value);
    this.orgSer.saveEvidence(formData,this.selectedQuarter.id,this.selectedQuarter.result[0].id).subscribe((res:any)=>{
      console.log("success");
    });
  }
}