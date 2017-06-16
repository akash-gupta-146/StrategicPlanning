import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrganizationService2 } from '../../../providers/organization.service2';
import { CommonService } from '../../../providers/common.service';

declare let $;

@Component({
  selector: 'new-spi',
  templateUrl: './new.spi.component.html'
})
export class NewSpi {
  public spiForm:FormGroup;
  goalId;
  constructor(public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public orgService: OrganizationService2,
    public commonService: CommonService) {
      this.route.params.subscribe(param => {
                    console.log(param);
                    if (param['goalId']) this.goalId = param['goalId'];
                  });
                  this.spiForm = this.initSpiForm();
  }
  initSpiForm(){
    return this.formBuilder.group({
                    "spi": ['', [Validators.required]],
                    "measureUnit": ['', [Validators.required]],
                    "currentLevel": ['', [Validators.required]],                    
                    "frequencyId":[1],
                    "targetDigital": this.formBuilder.array(this.inItTarget()),
                  });
  }
  public inItTarget() {
    const fa = [];
    this.commonService.getData('org_info')[0].cycle.forEach(element => {
      fa.push(this.inItTargetDigital(element));
    });
    return fa;
  }
  public inItTargetDigital(year) {
    return this.formBuilder.group({
      "year": [year, [Validators.required]],
      "expectedLevel": ['', [Validators.required]],
    });
  }
  orgId;
  cycleId;
  public submitSpi(){
    // this.orgId = this.commonService.getData('org_info')[0].id;
    // this.cycleId = this.commonService.getData('org_info')[0].cycles.id;
    // console.log(this.spiForm.value);
    this.spiForm.value['objectiveId'] = this.goalId;
    this.orgService.saveSpi(this.spiForm.value).subscribe(res =>{
      $('#spiModal').modal('show');
      this.spiForm = this.initSpiForm();
    },err =>{
      console.log("asdfds",err);
    })
  }
}