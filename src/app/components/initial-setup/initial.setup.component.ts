import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { OrganizationService } from '../../services/organization.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'initial-setup',
  templateUrl: './initial.setup.component.html'
})

export class InitialSetup implements OnInit {

  cmvvForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public orgService: OrganizationService,
              public dataservice: DataService) { }

  ngOnInit() {
     this.cmvvForm = this.formBuilder.group({
      "startCycle": ['', [Validators.required]],
      "endCycle": ['', [Validators.required]],
      "mission": ['', [Validators.required]],
      "vision": ['', [Validators.required]],
      "values": this.formBuilder.array([this.inItValue()])
    });
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
    this.cmvvForm.value.cycle = {
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

}