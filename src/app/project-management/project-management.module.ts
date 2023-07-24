import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { ProjReportComponent } from './proj-report/proj-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';


const routes: Routes = [
  { path: '', component: ProjectManagementComponent },
  { path: 'team', component: TeamManagementComponent },
  { path: 'task', component: TaskManagementComponent },
  { path: 'proj-report', component: ProjReportComponent }
]


@NgModule({
  declarations: [
    ProjectManagementComponent,
    TeamManagementComponent,
    TaskManagementComponent,
    ProjReportComponent
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
export class ProjectManagementModule { }
