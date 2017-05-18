import { Component, AfterViewInit,AfterViewChecked} from '@angular/core';
import { CredentialService } from './providers/credential.service';
import { CommonService } from './providers/common.service';
import { Router } from '@angular/router';
declare let $;
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css']
})

export class AppComponent implements AfterViewInit{

  private loggedIn: boolean = false;
  private role:string;
  constructor(private credentialService: CredentialService,
              private commonService:CommonService,
              private router: Router) {             
  }


  ngAfterViewInit(){
    $("#wrapper").toggleClass("toggled");
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
  }
  isLoggedIn() {
    return this.credentialService.isLoggedIn();
  }

  logout() {
    this.credentialService.logOut();
    this.router.navigateByUrl("/login");
  }
}
