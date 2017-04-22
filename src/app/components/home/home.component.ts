import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../providers/common.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  organizationInfo;

  constructor(public commonService: CommonService) { }

  ngOnInit() {
    this.organizationInfo = this.commonService.getData('org_info');
    console.log("DSADAS", this.organizationInfo)
  }

}
