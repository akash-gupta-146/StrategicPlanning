import { Component } from '@angular/core';
import { CredentialService } from './services/credential.service';
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private credentialService:CredentialService){

  }
  isLoggedIn() {
    return this.credentialService.isLoggedIn();
  }
}
