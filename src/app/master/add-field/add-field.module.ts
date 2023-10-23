import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AddFieldComponent } from './add-field.component';




const routes: Routes = [
  { path: '', component: AddFieldComponent },
 
]

@NgModule({
  declarations: [
    AddFieldComponent
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
export class AddFieldModule { }
