import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CredentialService } from '../../services/credential.service';
declare let $;
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public formBuilder: FormBuilder,
    public credentialService: CredentialService,
    private router: Router, ) {
    if (this.credentialService.isLoggedIn()) {
      this.router.navigateByUrl("/dashboard");
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  ngAfterViewChecked() {
     $("#login-button").click(function(event) {
 	event.preventDefault();

 	$('form').fadeOut(500);
 	$('.wrapper').addClass('form-success');
 });
  }  
  onSubmit() {
    this.credentialService.verifyUser(this.loginForm.value).subscribe((res) => {
      this.verifySuccessfully(res);
      localStorage.setItem("access_token", res.access_token);
      console.log("asfd",res);
      this.router.navigate(['/home']);
    }, (err) => {
      this.verifyFailed(err);
    });
  }
  public verifySuccessfully(res) {
    localStorage.setItem("access_token", res.access_token);
  }
  public verifyFailed(err) {
    
  }
}
