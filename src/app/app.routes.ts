import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedInGuard } from './components/login/login.guard';
import { StrategicGoal } from './components/strategic-goal/goal.component';
import { GoalInitiative } from './components/goal-initiative/initiative.component';
import { Dashboard } from './pages/dashboard/dashboard.component';
import { InitialSetup } from './components/initial-setup/initial.setup.component';
import { HODComponent } from './components/hod/hod.component';
import { QuarterResult } from './components/hod/result/quarter.result.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component:Dashboard, canActivate: [LoggedInGuard]},
  { path: 'initial-setup', component:InitialSetup, canActivate: [LoggedInGuard]},
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'strategic-goal', component: StrategicGoal, canActivate: [LoggedInGuard] },
  { path: 'strategic-goal/:orgId', component: StrategicGoal, canActivate: [LoggedInGuard] },
  { path: 'goal-initiative/:goalId', component: GoalInitiative, canActivate: [LoggedInGuard] },
  { path: 'hod-home-page', component: HODComponent, canActivate: [LoggedInGuard]},
  { path: 'quarter-result', component:QuarterResult, canActivate:[LoggedInGuard]}
];

