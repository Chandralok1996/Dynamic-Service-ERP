import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigItemComponent } from './config-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CreateConfigComponent } from './create-config/create-config.component';
import { UpdateConfigComponent } from './update-config/update-config.component';



const routes: Routes = [
  { path: '', component: ConfigItemComponent },
  { path: 'create', component: CreateConfigComponent },
  { path: 'update/:id', component: UpdateConfigComponent }
]

@NgModule({
  declarations: [
    ConfigItemComponent,
    CreateConfigComponent,
    UpdateConfigComponent
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
export class ConfigItemModule { }
