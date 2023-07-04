import { NgModule } from '@angular/core';
import { adminGuard } from './admin.guard';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormMasterComponent } from './form-master/form-master.component';
import { TableMasterComponent } from './table-master/table-master.component';
import { ViewFormComponent } from './form-master/view-form/view-form.component';
import { AddFormFieldComponent } from './form-master/view-form/add-column.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
    { path: 'form-master', component: FormMasterComponent, canActivate: [adminGuard] },
    { path: 'view-form/:id', component: ViewFormComponent, canActivate: [adminGuard] },
    { path: 'table-master', component: TableMasterComponent, canActivate: [adminGuard] }
  ]}
];

@NgModule({
  declarations: [
    AdminComponent,
    FormMasterComponent,
    AddFormFieldComponent,
    TableMasterComponent,
    ViewFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
