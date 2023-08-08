import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventManagementComponent } from './event-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { Routes, RouterModule } from '@angular/router';
import { EventCreateComponent } from './event-create.component';

const routes: Routes = [
  { path: '', component: EventManagementComponent }
]

@NgModule({
  declarations: [
    EventManagementComponent,
    EventCreateComponent
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
