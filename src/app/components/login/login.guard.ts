import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CredentialService } from '../../providers/credential.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(public credentialService: CredentialService) {

  }

  canActivate() {
    return this.credentialService.isLoggedIn();
  }

}