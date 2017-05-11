import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrganizationService2 } from '../../../providers/organization.service2';
import { CommonService } from '../../../providers/common.service';
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
                  this.spiForm = this.formBuilder.group({
                    "spi": ['', [Validators.required]],
                    "measureUnit": ['', [Validators.required]],
                    "currentLevel": ['', [Validators.required]],
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
      "level": ['', [Validators.required]],
    });
  }
  orgId;
  cycleId;
  public submitSpi(){
    this.orgId = this.commonService.getData('org_info')[0].id;
    this.cycleId = this.commonService.getData('org_info')[0].cycles.id;
    console.log(this.spiForm.value);
    this.orgService.saveSpi(this.orgId,this.cycleId,this.goalId,this.spiForm.value).subscribe(res =>{
      console.log("asdfds",res);
    },err =>{
      console.log("asdfds",err);
    })
  }
}