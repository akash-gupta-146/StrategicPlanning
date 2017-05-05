import { Component, AfterViewInit, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrganizationService2 } from '../../providers/organization.service2';
import { CommonService } from '../../providers/common.service';

@Component({
  selector: 'strategic-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
})
export class StrategicGoal {
  public objectives = [];
  public orgId;
  constructor(private route: ActivatedRoute,
              public orgService: OrganizationService2,
              public commonService: CommonService) {
              this.orgId = this.commonService.getData('org_info')[0].id;
              let cycleId = commonService.getData('org_info')[0].cycles.id;
              console.log("DSDA", cycleId);
              this.orgService.fetchObjectives(this.orgId, cycleId).subscribe(response => {
                if (response.status === 204) {
                  this.objectives = [];
                } else {
                  this.objectives = response;
                }
              }, error => {
                this.objectives = [];
              });
    }
}