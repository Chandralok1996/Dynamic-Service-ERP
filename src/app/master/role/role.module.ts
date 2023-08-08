import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';

const routes: Routes = [
  {path: '', component: RoleComponent },
  {path: 'create', component:CreateRoleComponent},
  {path: 'update', component: UpdateRoleComponent}
]

@NgModule({
  declarations: [
    RoleComponent,
    CreateRoleComponent,
    UpdateRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RoleModule { }
