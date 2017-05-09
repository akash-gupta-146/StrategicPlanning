import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RequestOptions, HttpModule, XHRBackend } from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { CredentialService } from './providers/credential.service';
import { LoggedInGuard } from './components/login/login.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { StrategicGoal } from './components/strategic-goal/goal.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GoalInitiative } from './components/goal-initiative/initiative.component';
import { Dashboard } from './components/dashboard/dashboard.component';
import { InitialSetup } from './components/initial-setup/initial.setup.component';
import { HODComponent } from './components/hod/hod.component';
import { QuarterResult } from './components/hod/result/quarter.result.component';
import { NewActivity } from './components/goal-initiative/new.activity.component';
import { NewGoalComponent } from './components/strategic-goal/new.goal.component';
import { NewInitiative } from './components/goal-initiative/new.initiative.component';

// import service
import { CustomHttpService } from './providers/default.header.service';
import { CommonService } from './providers/common.service';
import { OrganizationService2 } from './providers/organization.service2';
import { NavService } from './providers/event.service';
import { GoogleChart} from './custom-component/chart.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Dashboard,
    HomeComponent,
    StrategicGoal,
    GoalInitiative,
    InitialSetup,
    HODComponent,
    QuarterResult,
    NewActivity,
    NewGoalComponent,
    NewInitiative,
    GoogleChart,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig)
  ],
  providers: [
    CredentialService,
    LoggedInGuard,
    CommonService,
    OrganizationService2,
    NavService,
    {
      provide: CustomHttpService,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new CustomHttpService(backend, defaultOptions);
      },
      deps: [XHRBackend, RequestOptions]
    },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
