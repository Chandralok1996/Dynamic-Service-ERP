import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ApprovalFlowComponent } from './approval-flow.component';
import { CreateApprovalComponent } from './create-approval/create-approval.component';

const routes: Routes = [
  { path: '', component: ApprovalFlowComponent },
  { path: 'createApproval', component: CreateApprovalComponent }
]

@NgModule({
  declarations: [
    ApprovalFlowComponent,
    CreateApprovalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ApprovalModule { }
