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
  constructor(private credentialService: CredentialService, private orgService : OrganizationService) {
    this.orgService.fetchOrganizationInfo().then(response =>{
      this.organisations = response.json();
    },error =>{
      console.log(error);
    })
  }
  isLoggedIn() {
    return this.credentialService.isLoggedIn();
  }
  ngAfterViewInit(){

  }
}
