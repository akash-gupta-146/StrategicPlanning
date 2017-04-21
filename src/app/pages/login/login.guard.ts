import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CredentialService } from '../../services/credential.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(public credentialService: CredentialService) {

  }

  canActivate() {
    let IsLoggedIn = this.credentialService.isLoggedIn();
    if (IsLoggedIn) {
      // this.config.buildUrl();
    }
    return this.credentialService.isLoggedIn();
  }

}