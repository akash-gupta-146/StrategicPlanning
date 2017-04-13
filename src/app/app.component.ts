import { Component, AfterViewInit } from '@angular/core';
import { CredentialService } from './services/credential.service';
import { OrganizationService} from './services/organization.service';
declare let $;
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  organisations = [];
  constructor(private credentialService: CredentialService) {
    
  }
  isLoggedIn() {
    return this.credentialService.isLoggedIn();
  }
  ngAfterViewInit(){
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
      }
    );
  }
}
