import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkManagementComponent } from './link-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { LinkFormComponent } from './link-form/link-form.component';
import { MatDialogModule } from '@angular/material/dialog';
const routes: Routes = [
  { path: ' ', component: LinkManagementComponent },
  {path: 'create', component:LinkFormComponent},
]


@NgModule({
  declarations: [
    LinkManagementComponent,
    LinkFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class LinkManagementModule { }
