import { Component } from '@angular/core';
import { CredentialService } from './services/credential.service';
import { Router } from '@angular/router';
import { NavService } from './providers/event.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css']
})

export class AppComponent {

  private loggedIn: boolean = false;

  constructor(private credentialService: CredentialService,
              private _navService: NavService,
              private router: Router) {
    this.handleEvents();
  }

  public handleEvents() {
    this._navService.getNavChangeEmitter().subscribe((item) => {
      this.router.navigate(['/home']);
      this.loggedIn = true;
    });
  }

  isLoggedIn() {
    return this.credentialService.isLoggedIn();
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

}
