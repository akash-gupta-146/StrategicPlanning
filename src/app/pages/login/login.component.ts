import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CredentialService } from '../../services/credential.service';

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
  onSubmit() {
    this.credentialService.verifyUser(this.loginForm.value).subscribe((res) => {
      this.verifySuccessfully(res);
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
