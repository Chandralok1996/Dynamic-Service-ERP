import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ServiceComponent } from './service.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { UpdateServiceComponent } from './update-service/update-service.component';


const routes: Routes = [
  {path: '', component: ServiceComponent },
  {path: 'createService', component:CreateServiceComponent},
  {path: 'updateService/:id', component: UpdateServiceComponent}
]

@NgModule({
  declarations: [
    ServiceComponent,
    CreateServiceComponent,
    UpdateServiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ServiceModule { }
