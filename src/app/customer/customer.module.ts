import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: CustomerComponent }
]

@NgModule({
  declarations: [
    CustomerComponent
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
export class CustomerModule { }
