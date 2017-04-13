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
  constructor(private credentialService: CredentialService) {}
  isLoggedIn() {
    return this.credentialService.isLoggedIn();
  }
  ngAfterViewInit(){
    
  }
}
