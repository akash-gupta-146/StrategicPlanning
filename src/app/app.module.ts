import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { GithubService } from './pages/github/shared/github.service';
import { CredentialService } from './services/credential.service';
import { ConfigurationService } from './services/configuration.service';
import { GoalService } from './services/goal.service';
import { OrganizationService } from './services/organization.service';
import { DataService } from './services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { StrategicGoal } from './pages/strategic-goal/goal.component';
import { RepoBrowserComponent } from './pages/github/repo-browser/repo-browser.component';
import { RepoListComponent } from './pages/github/repo-list/repo-list.component';
import { RepoDetailComponent } from './pages/github/repo-detail/repo-detail.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ContactComponent } from './pages/contact/contact.component';
import { GoalInitiative } from './pages/goal-initiative/initiative.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    RepoBrowserComponent,
    RepoListComponent,
    RepoDetailComponent,
    HomeComponent,
    StrategicGoal,
    ContactComponent,
    GoalInitiative
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    GithubService,
    CredentialService,
    ConfigurationService,
    OrganizationService,
    GoalService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
