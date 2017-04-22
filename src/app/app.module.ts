import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { CredentialService } from './services/credential.service';
import { ConfigurationService } from './services/configuration.service';
import { GoalService } from './services/goal.service';
import { OrganizationService } from './services/organization.service';
import { DataService } from './services/data.service';
import { LoggedInGuard } from './pages/login/login.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { StrategicGoal } from './pages/strategic-goal/goal.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GoalInitiative } from './pages/goal-initiative/initiative.component';
import { Dashboard } from './pages/dashboard/dashboard.component';
import { AddEmployee } from './pages/admin/employee/add.employee.component';
import { InitialSetup } from './pages/initial-setup/initial.setup.component';
import { HODComponent } from './pages/hod/hod.component';


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
    HODComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    CredentialService,
    ConfigurationService,
    OrganizationService,
    GoalService,
    DataService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
