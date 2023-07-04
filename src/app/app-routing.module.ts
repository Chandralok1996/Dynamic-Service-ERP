import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appGuard } from './app.guard';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', loadChildren:()=>import('./login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren:()=>import('./home/home.module').then(m => m.HomeModule) , canActivate: [appGuard] },
  { path: 'admin', loadChildren:()=>import('./_admin-dev/admin.module').then(m => m.AdminModule), canActivate: [appGuard]},
  { path: 'user-master', loadChildren:()=>import('./master/user/user.module').then(m => m.UserModule), canActivate: [appGuard]},
  { path: 'role-master', loadChildren:()=>import('./master/role/role.module').then(m => m.RoleModule), canActivate: [appGuard]},
  { path: 'item-master', loadChildren:()=>import('./master/item/item.module').then(m => m.ItemModule), canActivate: [appGuard]},
  { path: '**', redirectTo: 'sign-in', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
