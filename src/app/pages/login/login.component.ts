import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CredentialService } from '../../services/credential.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup;
  constructor(public formBuilder:FormBuilder,
              public credentialService:CredentialService,
              private router: Router,){
              if (this.credentialService.isLoggedIn()) {
                this.router.navigateByUrl("/home");
              }
  }
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  onSubmit(){
    this.credentialService.login(this.loginForm.value).then( res =>{
      location.reload();
    })
  }
}
