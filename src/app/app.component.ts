import { Component } from '@angular/core';
import { CredentialService } from './services/credential.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css']
})

export class AppComponent {

  constructor(private credentialService: CredentialService,
              private router: Router) { }

  isLoggedIn() {
    return this.credentialService.isLoggedIn();
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

}
