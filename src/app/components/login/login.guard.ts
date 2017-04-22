import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CredentialService } from '../../services/credential.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(public credentialService: CredentialService) {

  }

  canActivate() {
    return this.credentialService.isLoggedIn();
  }

}