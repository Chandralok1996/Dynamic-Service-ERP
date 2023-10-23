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

import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { AssetLocationDetailsComponent } from './dashboard-card/asset-location-details/asset-location-details.component';
import { AssetTypeDetailsComponent } from './dashboard-card/asset-type-details/asset-type-details.component';
import { AssetAssignedDetailsComponent } from './dashboard-card/asset-assigned-details/asset-assigned-details.component';
import { CallModeStatusDetailsComponent } from './dashboard-card/call-mode-status-details/call-mode-status-details.component';
import { CallResStatusDetailsComponent } from './dashboard-card/call-res-status-details/call-res-status-details.component';
import { CallTypeStatusDetailsComponent } from './dashboard-card/call-type-status-details/call-type-status-details.component';
import { HardwareDetailsComponent } from './dashboard-card/hardware-details/hardware-details.component';
import { SlaDetailsComponent } from './dashboard-card/sla-details/sla-details.component';
import { PendingStatusDetailsComponent } from './dashboard-card/pending-status-details/pending-status-details.component';
import { EngineerDetailsComponent } from './dashboard-card/engineer-details/engineer-details.component';
import { EngineerCallDetailsComponent } from './dashboard-card/engineer-call-details/engineer-call-details.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { DetailsTicketComponent } from './details-ticket/details-ticket.component';

const routes: Routes = [
  { path: '', component: ItsmComponent },
  { path: 'laptop', component: LaptopManagementComponent },
  { path: 'desktop', component: DesktopManagementComponent },
  { path: 'server', component: ServerManagementComponent },
  { path: 'monitor', component: MonitorManagementComponent },
  { path: 'accessories', component: AccessoriesManagementComponent },
  { path: 'dashboard-card', component: DashboardCardComponent },
  { path: 'pending-status', component: PendingStatusDetailsComponent },
  { path: 'call-mode', component: CallModeStatusDetailsComponent },
  { path: 'call-type', component: CallTypeStatusDetailsComponent },
  { path: 'call-response', component: CallResStatusDetailsComponent },
  { path: 'sla-details', component: SlaDetailsComponent },
  { path: 'assignedUnassignedDetails', component: AssetAssignedDetailsComponent },
  { path: 'assetLocation_Details', component: AssetLocationDetailsComponent },
  { path: 'assetTypeDetails', component: AssetTypeDetailsComponent },
 { path: 'create-tickets', component: CreateTicketComponent },
  { path: 'update-tickets', component: UpdateTicketComponent },
  { path: 'details-tickets', component: DetailsTicketComponent },

]

@NgModule({
  declarations: [
    ItsmComponent,
    LaptopManagementComponent,
    DesktopManagementComponent,
    ServerManagementComponent,
    MonitorManagementComponent,
    AccessoriesManagementComponent,
    HistoryManagementComponent,
    DashboardCardComponent,
    AssetLocationDetailsComponent,
    AssetTypeDetailsComponent,
    AssetAssignedDetailsComponent,
    CallModeStatusDetailsComponent,
    CallResStatusDetailsComponent,
    CallTypeStatusDetailsComponent,
    HardwareDetailsComponent,
    SlaDetailsComponent,
    PendingStatusDetailsComponent,
    EngineerDetailsComponent,
    EngineerCallDetailsComponent,
    CreateTicketComponent,
    UpdateTicketComponent,
    DetailsTicketComponent
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
