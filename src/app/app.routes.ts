import { Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { RepoBrowserComponent } from './pages/github/repo-browser/repo-browser.component';
import { RepoListComponent } from './pages/github/repo-list/repo-list.component';
import { RepoDetailComponent } from './pages/github/repo-detail/repo-detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { StrategicGoal } from './pages/strategic-goal/goal.component';
import { GoalInitiative } from './pages/goal-initiative/initiative.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'strategic-goal', component: StrategicGoal },
  { path: 'strategic-goal/:orgId', component: StrategicGoal },
  { path: 'goal-initiative/:goalId', component: GoalInitiative },
  { path: 'about', component: AboutComponent },
  {
    path: 'github', component: RepoBrowserComponent,
    children: [
      { path: '', component: RepoListComponent },
      {
        path: ':org', component: RepoListComponent,
        children: [
          { path: '', component: RepoDetailComponent },
          { path: ':repo', component: RepoDetailComponent }
        ]
      }]
  },
  { path: 'contact', component: ContactComponent }
];

