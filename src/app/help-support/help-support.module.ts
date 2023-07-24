import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpSupportComponent } from './help-support.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HelpSupportComponent }
]

@NgModule({
  declarations: [
    HelpSupportComponent
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
export class HelpSupportModule { }
