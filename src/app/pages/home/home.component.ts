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
  constructor(public formBuilder: FormBuilder,
    public orgService: OrganizationService,
    public dataservice: DataService) {
    this.getCycle();
    this.getOrganizationInfo();
  }

  ngOnInit() {

  }
  cycle = [];
  public organizationInfo = [];
  getOrganizationInfo() {
    this.orgService.fetchOrganizationInfo().then(res => {
      this.organizationInfo = res.json();
      console.log(this.organizationInfo);
      var startYear = new Date(this.organizationInfo[0].cycles.startCycle).getFullYear();
      var endYear = new Date(this.organizationInfo[0].cycles.endCycle).getFullYear();
      for (var y = startYear; y <= endYear; y++)
        this.cycle.push(y);
      this.organizationInfo[0]['cycle'] = this.cycle;
      this.dataservice.setObjective(this.organizationInfo[0]);
    }, (error) => {
      console.log(error);
    });
  }
  orgCycle;
  getCycle() {
    this.orgService.getCycle().then(res => {
      this.orgCycle = res.json();
      console.log("print nhi", this.orgCycle);
    }, err => {
      console.log(err);
    })
  }

}
