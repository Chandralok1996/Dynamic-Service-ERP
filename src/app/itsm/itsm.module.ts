import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItsmComponent } from './itsm.component';
import { LaptopManagementComponent } from './laptop-management/laptop-management.component';
import { DesktopManagementComponent } from './desktop-management/desktop-management.component';
import { ServerManagementComponent } from './server-management/server-management.component';
import { MonitorManagementComponent } from './monitor-management/monitor-management.component';
import { AccessoriesManagementComponent } from './accessories-management/accessories-management.component';
import { HistoryManagementComponent } from './history-management/history-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { MaterialModule } from '../material.module';


const routes: Routes = [
  { path: '', component: ItsmComponent },
  { path: 'laptop', component: LaptopManagementComponent },
  { path: 'desktop', component: DesktopManagementComponent },
  { path: 'server', component: ServerManagementComponent },
  { path: 'monitor', component: MonitorManagementComponent },
  { path: 'accessories', component: AccessoriesManagementComponent },
  { path: 'history', component: HistoryManagementComponent },

]

@NgModule({
  declarations: [
    ItsmComponent,
    LaptopManagementComponent,
    DesktopManagementComponent,
    ServerManagementComponent,
    MonitorManagementComponent,
    AccessoriesManagementComponent,
    HistoryManagementComponent
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
export class ItsmModule { }
