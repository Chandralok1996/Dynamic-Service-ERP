import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentComponent } from './incident.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CaseManagementComponent } from './case-management/case-management.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { EngViewComponent } from './eng-view/eng-view.component';

const routes: Routes = [
  { path: '', component: IncidentComponent },
  { path: 'case', component: CaseManagementComponent },
  { path: 'task', component: TaskManagementComponent },
  { path: 'eng', component: EngViewComponent }
]

@NgModule({
  declarations: [
    IncidentComponent,
    CaseManagementComponent,
    TaskManagementComponent,
    EngViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class IncidentModule { }
