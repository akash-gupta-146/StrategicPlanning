import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
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
];

