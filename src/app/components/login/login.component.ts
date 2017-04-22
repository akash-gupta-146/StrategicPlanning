import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialService } from '../../services/credential.service';
import { CommonService } from '../../providers/common.service';
import { OrganizationService2 } from '../../providers/organization.service2';
import { NavService } from '../../providers/event.service';
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

  @Output() userLogin: EventEmitter<any> = new EventEmitter();

  constructor(public formBuilder: FormBuilder,
              private commonService: CommonService,
              public credentialService: CredentialService,
              public org_ser: OrganizationService2,
              public navService: NavService,
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
    }, (err) => {
      this.onError();
    });
  }

  public getCycle(data) {
    this.commonService.storeData("access_token", data.access_token);
    this.org_ser.getCycle().subscribe((res) => {
      this.fetchOrganizationInfo(res);
    }, (err) => {
      this.onError();
    });
  }

  public fetchOrganizationInfo(data) {
    this.org_ser.fetchOrganizationInfo().subscribe((res) => {
      this.commonService.storeData("org_cycle", data);
      this.commonService.storeData("org_info", res);
      this.onSuccess();
    }, (err) => {
      this.onError();
    });
  }

  public onSuccess() {
    this.loginStart = false;
    this.userLogin.emit("user:login");
    this.navService.emitNavChangeEvent("user:login");
    // this.router.navigate(['/home']);
  }

  public onError() {
    this.loginStart = false;
    this.error = true;
  }

}

