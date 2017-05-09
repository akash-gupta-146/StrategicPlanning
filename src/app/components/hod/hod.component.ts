import {Component, AfterViewInit} from '@angular/core';
import {OrganizationService2} from '../../providers/organization.service2';
declare let $;
@Component({
  selector:'hod-home-page',
  templateUrl:'./hod.component.html',
  styleUrls:['./hod.component.css']
})
export class HODComponent implements AfterViewInit{
  public assignedActivities = [];
  actTar = [];
  targetIndex = 0;
  public approvalData = [
          ['state', 'data'],
          ['Approved', 20],
          ['Rejected', 25],
          ['Review', 30]          
        ];
  public approvalChartOption = {
          title: 'Assigned Activities result: 2014-2017',
          chartArea: { width: '80%' }, 
          is3D: true
        };

  public targetChartOption = {
          title: 'Target Estimation',
          is3D: true,
          pieSliceText: 'label',
          slices: {  1: {offset: 0.2}},
          chartArea: { width: '80%' },
        };
  public targetData = [['Target', 'level'],['Exceeded',60],['Under Target',40],['Meet',60]];

  public progressData = [['status', 'progress', { role: 'style' }],
                        ['Filled',50,'color: green'],
                        ['Inprogress',20,'color: blue'],
                        ['Incomplete',30,'color: red']];
  public progressChartOption = {
        title: "Current progress of the Activities",
        bar: {groupWidth: "50%"},
        legend: { position: "none" },
      };                        

  constructor(public orgService:OrganizationService2){
    this.orgService.fetchAssignedActivity().subscribe(response =>{
      if(response.status === 204)
        this.assignedActivities = [];
      else
        this.assignedActivities = response;
      console.log(this.assignedActivities);
    });
  }

  onSelected(data) {
    console.log(data);
  }
  ngAfterViewInit(){
      $('.panel.panel-chat').hide();
      $(".panel.panel-chat > .panel-heading > .chatMinimize").click(function(){
        if($(this).parent().parent().hasClass('mini'))
        {
            $(this).parent().parent().removeClass('mini').addClass('normal');

            $('.panel.panel-chat > .panel-body').animate({height: "250px"}, 500).show();

            $('.panel.panel-chat > .panel-footer').animate({height: "75px"}, 500).show();
        }
        else
        {
            $(this).parent().parent().removeClass('normal').addClass('mini');

            $('.panel.panel-chat > .panel-body').animate({height: "0"}, 500);

            $('.panel.panel-chat > .panel-footer').animate({height: "0"}, 500);

            setTimeout(function() {
                $('.panel.panel-chat > .panel-body').hide();
                $('.panel.panel-chat > .panel-footer').hide();
            }, 500);


        }

    });
    $(".panel.panel-chat > .panel-heading > .chatClose").click(function(){
        // $(this).parent().parent().remove();
        $(this).parent().parent().hide();
    });
  }
}