import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventManagementComponent } from './event-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: EventManagementComponent }
]

@NgModule({
  declarations: [
    EventManagementComponent
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
export class EventManagementModule { }
