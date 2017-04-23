import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RequestOptions, HttpModule, XHRBackend } from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { CredentialService } from './services/credential.service';
import { ConfigurationService } from './services/configuration.service';
import { GoalService } from './services/goal.service';
import { OrganizationService } from './services/organization.service';
import { DataService } from './services/data.service';
import { LoggedInGuard } from './components/login/login.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { StrategicGoal } from './components/strategic-goal/goal.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GoalInitiative } from './components/goal-initiative/initiative.component';
import { Dashboard } from './pages/dashboard/dashboard.component';
import { AddEmployee } from './pages/admin/employee/add.employee.component';
import { InitialSetup } from './components/initial-setup/initial.setup.component';
import { HODComponent } from './components/hod/hod.component';
import { QuarterResult } from './components/hod/result/quarter.result.component';

// import service
import { CustomHttpService } from './providers/default.header.service';
import { CommonService } from './providers/common.service';
import { OrganizationService2 } from './providers/organization.service2';
import { NavService } from './providers/event.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Dashboard,
    HomeComponent,
    StrategicGoal,
    GoalInitiative,
    AddEmployee,
    InitialSetup,
    HODComponent,
    QuarterResult
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
    ConfigurationService,
    OrganizationService,
    GoalService,
    DataService,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
