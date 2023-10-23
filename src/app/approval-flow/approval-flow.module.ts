import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ApprovalFlowComponent } from './approval-flow.component';
import { CreateApprovalComponent } from './create-approval/create-approval.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { ApprovalAcceptedComponent } from './approval-accepted/approval-accepted.component';
import { ApprovalDeclineComponent } from './approval-decline/approval-decline.component';
const routes: Routes = [
  { path: '', component: ApprovalFlowComponent },
  { path: 'createApproval', component: ApprovalFlowComponent },
  { path: 'approval-flow', component: CreateApprovalComponent },
  { path: 'approvalList', component: ApprovalListComponent },
  { path: 'approvalAccepted', component: ApprovalAcceptedComponent },
  { path: 'approvalDecline', component: ApprovalDeclineComponent },
]

@NgModule({
  declarations: [
    ApprovalFlowComponent,
    CreateApprovalComponent,
    ApprovalListComponent,
    ApprovalAcceptedComponent,
    ApprovalDeclineComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ApprovalModule { }
