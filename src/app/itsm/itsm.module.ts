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
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { DetailsTicketComponent } from './details-ticket/details-ticket.component';
import { AllTicketListComponent } from './all-ticket-list/all-ticket-list.component';
import { AllTicketDetailsComponent } from './all-ticket-details/all-ticket-details.component';
import { AllTicketUpdateComponent } from './all-ticket-update/all-ticket-update.component';
import { HousekeepingRequestDetailsComponent } from './dashboard-card/housekeeping-request-details/housekeeping-request-details.component';
import { HrRequestDetailsComponent } from './dashboard-card/hr-request-details/hr-request-details.component';
import { ItRequestDetailsComponent } from './dashboard-card/it-request-details/it-request-details.component';

const routes: Routes = [
  { path: '', component: ItsmComponent },
  { path: 'dashboard-card', component: DashboardCardComponent },
  { path: 'HKDetails/:label/:days', component:HousekeepingRequestDetailsComponent  },
  { path: 'ITDetails/:label/:days', component:ItRequestDetailsComponent  },
  { path: 'HRDetails/:label/:days', component:HrRequestDetailsComponent  },
 { path: 'create-tickets', component: CreateTicketComponent },
 { path: 'allTickets', component: AllTicketListComponent },
  { path: 'update-tickets/:id', component: UpdateTicketComponent },
  { path: 'details-tickets/:id', component: DetailsTicketComponent },
  { path: 'details-tickets-by-type/:type/:id', component: AllTicketDetailsComponent },
  { path: 'update-tickets-by-type/:type/:id', component: AllTicketUpdateComponent },
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
    CreateTicketComponent,
    UpdateTicketComponent,
    DetailsTicketComponent,
    AllTicketListComponent,
    AllTicketDetailsComponent,
    AllTicketUpdateComponent,
    HousekeepingRequestDetailsComponent,
    HrRequestDetailsComponent,
    ItRequestDetailsComponent
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
