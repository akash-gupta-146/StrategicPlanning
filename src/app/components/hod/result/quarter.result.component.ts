import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { OrganizationService } from '../../../services/organization.service';
import { OrganizationService2} from '../../../providers/organization.service2';
@Component({
    selector: 'quarter-result',
    templateUrl: './quarter.result.html'
})
export class QuarterResult {
    public uploadForm: FormGroup;
    public files: any[] = new Array();
    public fdFiles = [];
    constructor(private orgServ:OrganizationService2) {
        this.uploadForm = new FormGroup({
            level: new FormControl('', [Validators.required]),
            comment: new FormControl('', [Validators.required]),
            file: new FormControl('', [Validators.required])
        });
    }
    postFile(event) {
        this.files = event.srcElement.files;
    }
    upload(newfile){
        console.log(newfile);
        let formData = new FormData();      
        formData.append('file',newfile);
        this.fdFiles.push(newfile);
        // this.http.post("https://yugma-ut.appspot-preview.com/upload-file",formData,options).toPromise().then( res =>{
        //     console.log(res);
        //     });
    }   
    onSubmit(){
        delete this.uploadForm.value['file'];
        this.uploadForm.value['files'] = this.fdFiles;
        this.uploadForm.value['quarterId'] = 4;
        console.log(this.uploadForm.value);
        this.orgServ.saveQuarteResult(this.uploadForm.value,1).subscribe(res =>{
            console.log("dsafsdf",res);
        })
        
    } 
}