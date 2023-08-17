import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appGuard } from './app.guard';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', loadChildren:()=>import('./login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren:()=>import('./home/home.module').then(m => m.HomeModule) , canActivate: [appGuard] },
  { path: 'customer', loadChildren:()=>import('./customer/customer.module').then(m => m.CustomerModule) , canActivate: [appGuard] },
  { path: 'it-sm', loadChildren:()=>import('./itsm/itsm.module').then(m => m.ItsmModule) , canActivate: [appGuard] },
  { path: 'proj-management', loadChildren:()=>import('./project-management/project-management.module').then(m => m.ProjectManagementModule) , canActivate: [appGuard] },
  { path: 'work-flow', loadChildren:()=>import('./work-flow/work-flow.module').then(m => m.WorkFlowModule) , canActivate: [appGuard] },
  { path: 'event', loadChildren:()=>import('./event-management/event-management.module').then(m => m.EventManagementModule) , canActivate: [appGuard] },
  { path: 'help-support', loadChildren:()=>import('./help-support/help-support.module').then(m => m.HelpSupportModule) , canActivate: [appGuard] },
  { path: 'incident', loadChildren:()=>import('./incident/incident.module').then(m => m.IncidentModule) , canActivate: [appGuard] },
  { path: 'history', loadChildren:()=>import('./history/history.module').then(m => m.HistoryModule) , canActivate: [appGuard] },
  { path: 'reset-password', loadChildren:()=>import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) , canActivate: [appGuard] },
  { path: 'admin', loadChildren:()=>import('./_admin-dev/admin.module').then(m => m.AdminModule), canActivate: [appGuard]},
  { path: 'user-master', loadChildren:()=>import('./master/user/user.module').then(m => m.UserModule), canActivate: [appGuard]},
  { path: 'role-master', loadChildren:()=>import('./master/role/role.module').then(m => m.RoleModule), canActivate: [appGuard]},
  { path: 'item-master', loadChildren:()=>import('./master/item/item.module').then(m => m.ItemModule), canActivate: [appGuard]},
  { path: 'ci-master', loadChildren:()=>import('./master/config-item/config-item.module').then(m =>m.ConfigItemModule), canActivate: [appGuard]},
  { path: '**', redirectTo: 'sign-in', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
