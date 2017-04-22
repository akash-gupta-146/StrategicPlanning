import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedInGuard } from './components/login/login.guard';
import { StrategicGoal } from './pages/strategic-goal/goal.component';
import { GoalInitiative } from './pages/goal-initiative/initiative.component';
import { Dashboard } from './pages/dashboard/dashboard.component';
import { InitialSetup } from './pages/initial-setup/initial.setup.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component:Dashboard, canActivate: [LoggedInGuard]},
  { path: 'initial-setup', component:InitialSetup, canActivate: [LoggedInGuard]},
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'strategic-goal', component: StrategicGoal, canActivate: [LoggedInGuard] },
  { path: 'strategic-goal/:orgId', component: StrategicGoal, canActivate: [LoggedInGuard] },
  { path: 'goal-initiative/:goalId', component: GoalInitiative, canActivate: [LoggedInGuard] }
];

