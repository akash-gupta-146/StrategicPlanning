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
  public currentLevel = [];
  public currentCost = [];
  public assignedActivities = [];
  public resultForm:FormGroup;
  public evidencForm:FormGroup;
  public commentForm:FormGroup;  
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

    this.commentForm = new FormGroup({
      comment: new FormControl("")
    });

    orgSer.fetchAssignedActivity().subscribe((res:any)=>{
      console.log(res);
      if(res.status == 204){
        this.assignedActivities = [];
      } else {
        this.assignedActivities = res;
      }
    }, (err:any)=>{
      this.assignedActivities = [];
    })
  }
  comments:any[];
  ngAfterViewInit(){
        $('.panel.panel-chat').hide();
    $(".panel.panel-chat > .panel-heading > .chatMinimize").click(function () {
      if ($(this).parent().parent().hasClass('mini')) {
        $(this).parent().parent().removeClass('mini').addClass('normal');

        $('.panel.panel-chat > .panel-body').animate({ height: "250px" }, 500).show();

        $('.panel.panel-chat > .panel-footer').animate({ height: "75px" }, 500).show();
      }
      else {
        $(this).parent().parent().removeClass('normal').addClass('mini');

        $('.panel.panel-chat > .panel-body').animate({ height: "0" }, 500);

        $('.panel.panel-chat > .panel-footer').animate({ height: "0" }, 500);

        setTimeout(function () {
          $('.panel.panel-chat > .panel-body').hide();
          $('.panel.panel-chat > .panel-footer').hide();
        }, 500);
      }

    });
    $(".panel.panel-chat > .panel-heading > .chatClose").click(function () {
      // $(this).parent().parent().remove();
      $(this).parent().parent().hide();
    });
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

  saveResult(quarterId:any,currentLevel:any,currentCost:any){
    var result ={
      "currentLevel":currentLevel,
      "currentCost":currentCost,
      "departmentId":this.cs.getData("user_roleInfo")[0].departmentId,
      "quarterId":quarterId
    }
    console.log(result);
    this.orgSer.saveQuarteResult(result,quarterId).subscribe((res:any)=>{
      console.log("success",res);
    })
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
  
  getDiscussion(result){
    this.comments = result;
    $("#evidenceForm").modal('hide');
  }

  submitComment(){
    this.commentForm.value["employeeId"] = "2625947700";
    this.commentForm.value["quarterLevelResultId"] = this.selectedQuarter.result[0].id;
    this.commentForm.value["commentedOn"] = new Date();
    console.log("asdf",this.commentForm.value);
    this.orgSer.saveComment(this.selectedQuarter.result[0].id, this.commentForm.value).subscribe((res:any)=>{
      this.comments.push(res);
      this.commentForm.reset();
    }, (error:any)=>{
      console.log("error",error);
    })
  }
  public edit:boolean;
  editable(len:any){
    if(len) {
      this.edit = true;
    }
    else{
      this.edit = false;
    } 
    return this.edit;
  }
}