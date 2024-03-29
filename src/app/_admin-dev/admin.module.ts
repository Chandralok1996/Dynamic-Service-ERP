import { NgModule } from "@angular/core";
import { adminGuard } from "./admin.guard";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { MaterialModule } from "../material.module";
import { RouterModule, Routes } from "@angular/router";
import { FormMasterComponent } from "./form-master/form-master.component";
import { TableMasterComponent } from "./table-master/table-master.component";
import { AddFormFieldComponent } from "./form-master/view-form/add-column.component";
import { UpdateFormFieldComponent } from "./form-master/view-form/update-column.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { PreviewComponent } from "./form-master/preview/preview.component";
import { ViewFormComponent } from "./form-master/view-form/view-form.component";
import { AddSubformComponent } from "./form-master/view-form/add-subform/add-subform.component";
import { PrevilengeComponent } from "./form-master/previlenge/previlenge.component";
import { ModalalertComponent } from "./form-master/modalalert/modalalert.component";
import { OrgPrivilegeComponent } from "./form-master/org-privilege/org-privilege.component";
import { FormListComponent } from "./form-list/form-list.component";
import { OrganizationComponent } from "./organization/organization.component";
import { CreateOrganizationComponent } from "./organization/create-organization/create-organization.component";
import { ModuleListComponent } from './module-list/module-list.component';

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "form-master/:id",
        component: FormMasterComponent,
        canActivate: [adminGuard],
      },
      {
        path: "view-form/:id",
        component: ViewFormComponent,
        canActivate: [adminGuard],
      },
      {
        path: "table-master",
        component: TableMasterComponent,
        canActivate: [adminGuard],
      },
      {
        path: "previlenge/:id",
        component: PrevilengeComponent,
        canActivate: [adminGuard],
      },
      {
        path: "orgPrivilege/:id",
        component: OrgPrivilegeComponent,
        canActivate: [adminGuard],
      },
      {
        path: "formList",
        component: FormListComponent,
        canActivate: [adminGuard],
      },
      {
        path: "organization",
        component: OrganizationComponent,
        canActivate: [adminGuard],
      },
      {
        path: "createOrganization",
        component: CreateOrganizationComponent,
        canActivate: [adminGuard],
      },
      {
        path: "SelectModule/:id",
        component: ModuleListComponent,
        canActivate: [adminGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    ViewFormComponent,
    FormMasterComponent,
    TableMasterComponent,
    AddFormFieldComponent,
    UpdateFormFieldComponent,
    PreviewComponent,
    AddSubformComponent,
    PrevilengeComponent,
    ModalalertComponent,
    OrgPrivilegeComponent,
    FormListComponent,
    OrganizationComponent,
    CreateOrganizationComponent,
    ModuleListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatMenuModule,
    FormsModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ],
})
export class AdminModule {}
