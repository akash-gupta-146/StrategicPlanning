import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CredentialService } from '../../services/credential.service';
import { NavService } from '../../providers/event.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(public credentialService: CredentialService,
              public navService: NavService) {

  }

  canActivate() {
    let IsLoggedIn = this.credentialService.isLoggedIn();
    if (IsLoggedIn) {
      // this.config.buildUrl();
      this.navService.emitNavChangeEvent("user:login");
    }
    return this.credentialService.isLoggedIn();
  }

}