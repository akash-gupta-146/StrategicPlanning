import { Routes } from '@angular/router';

import { HomeComponent } from './components/planner/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedInGuard } from './components/login/login.guard';
import { StrategicGoal } from './components/planner/strategic-goal/goal.component';
import { GoalInitiative } from './components/planner/goal-initiative/initiative.component';
import { Dashboard } from './components/dashboard/dashboard.component';
import { InitialSetup } from './components/planner/initial-setup/initial.setup.component';
import { HODComponent } from './components/hod/hod.component';
import { QuarterResult } from './components/hod/result/quarter.result.component';
import { NewActivity } from './components/planner/goal-initiative/new.activity.component';
import { NewGoalComponent } from './components/planner/strategic-goal/new.goal.component';
import { NewSpi } from './components/planner/strategic-goal/new.spi.component';
import { NewInitiative } from './components/planner/goal-initiative/new.initiative.component';
import { AdminHome } from './components/admin/home/home.component';
import { NewUniversity} from './components/admin/university/new.university.component';
import { NewDepartment } from './components/admin/department/new.department.component';
import { NewEmployee } from './components/admin/employee/new.employee';
import { ExistingDepartment } from './components/admin/department/existing.department.component';
import { AddRole } from './components/admin/employee/role/add.role.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component:Dashboard, canActivate: [LoggedInGuard]},
  { path: 'initial-setup', component:InitialSetup, canActivate: [LoggedInGuard]},
  { path: 'planner-home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'strategic-goal', component: StrategicGoal, canActivate: [LoggedInGuard] },
  { path: 'strategic-goal/:orgId', component: StrategicGoal, canActivate: [LoggedInGuard] },
  { path: 'goal-initiative/:goalId', component: GoalInitiative, canActivate: [LoggedInGuard] },
  { path: 'hod-home', component: HODComponent, canActivate: [LoggedInGuard]},
  { path: 'quarter-result/:levelId', component:QuarterResult, canActivate:[LoggedInGuard]},
  { path: 'new-activity/:goalId/:initiativeId', component:NewActivity, canActivate:[LoggedInGuard]},
  { path: 'new-goal', component:NewGoalComponent, canActivate:[LoggedInGuard]},
  { path: 'new-spi/:goalId', component:NewSpi, canActivate:[LoggedInGuard]},
  { path: 'new-initiative/:goalId', component:NewInitiative, canActivate:[LoggedInGuard]},
  { path: 'admin-home', component:AdminHome, canActivate:[LoggedInGuard]},
  { path: 'new-university', component:NewUniversity, canActivate:[LoggedInGuard]},
  { path: 'new-department', component:NewDepartment, canActivate:[LoggedInGuard]},
  { path: 'new-employee', component:NewEmployee, canActivate:[LoggedInGuard]},
  { path: 'existing-department', component:ExistingDepartment, canActivate:[LoggedInGuard]},
  { path: 'add-role', component:AddRole, canActivate:[LoggedInGuard]}
];

