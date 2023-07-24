import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { UserCreateComponent } from './user-create/user-create.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'create', component: UserCreateComponent },
  { path: 'update/:id', component: UserUpdateComponent }

]

@NgModule({
  declarations: [
    UserComponent,
    UserCreateComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
