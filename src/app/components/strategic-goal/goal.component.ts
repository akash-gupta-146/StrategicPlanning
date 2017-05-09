import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrganizationService2 } from '../../providers/organization.service2';
import { CommonService } from '../../providers/common.service';

@Component({
  selector: 'strategic-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
})
export class StrategicGoal implements OnInit{
  public loader:boolean = false;
  public objectives = [];
  public orgId;
  constructor(private route: ActivatedRoute,
              public orgService: OrganizationService2,
              public commonService: CommonService) {
              this.orgId = this.commonService.getData('org_info')[0].id;
              
              
    }
    ngOnInit(){
      this.loader = true;
      let cycleId = this.commonService.getData('org_info')[0].cycles.id;
      this.orgService.fetchObjectives(this.orgId, cycleId).subscribe(response => {
                if (response.status === 204) {
                  this.objectives = [];
                } else {
                  this.objectives = response;
                }
                this.loader = false;
              }, error => {
                this.objectives = [];
                this.loader = false;
              });
    }
}