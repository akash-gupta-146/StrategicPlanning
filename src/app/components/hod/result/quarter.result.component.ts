import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrganizationService2} from '../../../providers/organization.service2';
import { CommonService } from '../../../providers/common.service';
@Component({
    selector: 'quarter-result',
    templateUrl: './quarter.result.html'
})
export class QuarterResult {
    public uploadForm: FormGroup;
    public files: any[] = new Array();
    public levelId;
    public departmentId;
    constructor(private orgServ:OrganizationService2,private route: ActivatedRoute,private commonService:CommonService) {
        this.route.params.subscribe(param => {
            if (param['levelId']) this.levelId = param['levelId'];
        });
        this.departmentId = this.commonService.getData('user_departmentInfo')[0].departmentId;
        this.uploadForm = new FormGroup({
            level: new FormControl('', [Validators.required]),
            comment: new FormControl('', [Validators.required]),
            file: new FormControl('', [Validators.required])
        });
    }
    postFile(event) {
        this.files = event.srcElement.files;
    }   
    onSubmit(){
        let formData = new FormData();
        formData.append('comment',this.uploadForm.value['comment']);
        formData.append('level',this.uploadForm.value['level']);
        formData.append('departmentId',4);
        formData.append('files',this.files);
        this.orgServ.saveQuarteResult(formData,this.levelId).subscribe(res =>{
            console.log("dsafsdf",res);
        });        
    } 
}