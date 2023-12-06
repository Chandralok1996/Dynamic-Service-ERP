import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { QRCodeComponent } from './qrcode.component';
import { QRCodeModule } from 'angularx-qrcode';

const routes: Routes = [
  { path: '', component: QRCodeComponent },
 

]

@NgModule({
  declarations: [
    QRCodeComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    QRCodeModule,
    NgxMatSelectSearchModule,
    
        RouterModule.forChild(routes)
  ]
})
export class QRCodeMainModule { }
