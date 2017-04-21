import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoggedInGuard } from './pages/login/login.guard';
import { StrategicGoal } from './pages/strategic-goal/goal.component';
import { GoalInitiative } from './pages/goal-initiative/initiative.component';
import { Dashboard } from './pages/dashboard/dashboard.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component:Dashboard, canActivate: [LoggedInGuard]},
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'strategic-goal', component: StrategicGoal, canActivate: [LoggedInGuard] },
  { path: 'strategic-goal/:orgId', component: StrategicGoal, canActivate: [LoggedInGuard] },
  { path: 'goal-initiative/:goalId', component: GoalInitiative, canActivate: [LoggedInGuard] }
];

