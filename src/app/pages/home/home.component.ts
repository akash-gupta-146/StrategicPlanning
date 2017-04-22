import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { OrganizationService } from '../../services/organization.service';
import { DataService } from '../../services/data.service';

declare let $;
@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  cmvvForm: FormGroup;
  showCycle:boolean = true;
  constructor(public formBuilder: FormBuilder,
    public orgService: OrganizationService,
    public dataservice: DataService) {
    this.cmvvForm = this.formBuilder.group({
      "startCycle": ['', [Validators.required]],
      "endCycle": ['', [Validators.required]],
      "mission": ['', [Validators.required]],
      "vision": ['', [Validators.required]],
      "values": this.formBuilder.array([this.inItValue()])
    });
    this.getCycle();
    this.getOrganizationInfo();
  }

  ngOnInit() {
    
  }
  inItValue() {
    return this.formBuilder.group({
      "title": ['', [Validators.required]],
      "description": ['', [Validators.required]]
    });
  }
  removeValue(index) {
    const control = <FormArray>this.cmvvForm.controls['values'];
    control.removeAt(index);
  }
  addValue() {
    const control = <FormArray>this.cmvvForm.controls['values'];
    control.push(this.inItValue());
  }
  returnObject;
  cycle = [];
  submitted: boolean = false;
  onSubmit() {
    var startYear = new Date(this.cmvvForm.value.startCycle).getFullYear();
    var endYear = new Date(this.cmvvForm.value.endCycle).getFullYear();
    for (var y = startYear; y <= endYear; y++)
      this.cycle.push(y);

    this.cmvvForm.value['cycle'] = {};
    this.cmvvForm.value.cycle ={
      "startCycle": this.cmvvForm.value.startCycle,
      "endCycle": this.cmvvForm.value.endCycle
    };
    delete this.cmvvForm.value['startCycle'];
    delete this.cmvvForm.value['endCycle'];
    this.orgService.orgInitialSetup(this.cmvvForm.value).then(res => {
      this.returnObject = res.json();
      this.submitted = true;
      this.returnObject['cycle'] = this.cycle;
      // this.dataservice.objective = this.returnObject;
      this.dataservice.setObjective(this.returnObject);
    }, (error) => {
      console.log(error);
    })
  }
  public organizationInfo = [];
  getOrganizationInfo() {
    this.orgService.fetchOrganizationInfo().then(res => {
      this.organizationInfo = res.json();
      console.log(this.organizationInfo);
      var startYear = new Date(this.organizationInfo[0].cycles.startCycle).getFullYear();
      var endYear = new Date(this.organizationInfo[0].cycles.endCycle).getFullYear();
      for (var y = startYear; y <= endYear; y++)
        this.cycle.push(y);
      this.organizationInfo[0]['cycle']=this.cycle;
      this.dataservice.setObjective(this.organizationInfo[0]);
    }, (error) => {
      console.log(error);
    });
  }
  orgCycle;
  getCycle(){
    this.orgService.getCycle().then(res =>{
      this.orgCycle = res.json();
      console.log("print nhi",this.orgCycle);
    }, err =>{
      console.log(err);
    })
  }

}
