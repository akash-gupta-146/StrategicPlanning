import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialService } from '../../services/credential.service';
import { CommonService } from '../../services/common.service';
import { OrganizationService2 } from '../../services/organization.service2';
declare let $;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginStart: boolean = false;
  error:boolean = false;

  constructor(public formBuilder: FormBuilder,
              private commonService: CommonService,
              public credentialService: CredentialService,
              public org_ser: OrganizationService2,
              private router: Router) {
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

  private onSubmit() {
    this.loginStart = true;
    this.credentialService.verifyUser(this.loginForm.value).subscribe((res) => {
      this.getCycle(res);
      // this.onSuccess(res);
    }, (err) => {
      this.onError();
    });
  }

  public getCycle(data) {
    console.log(data)
    this.commonService.storeData("access_token", data.access_token);
    this.org_ser.getCycle().subscribe((res) => {
      console.log("AAAAAA", res)
    }, (err) => {

    });
  }

  public onSuccess(data) {
    this.loginStart = false;
    this.router.navigate(['/home']);
    this.commonService.storeData("access_token", data.access_token);
  }

  public onError() {
    this.loginStart = false;
    this.error = true;
  }

}

