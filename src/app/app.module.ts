import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AdminModule } from "./_admin-dev/admin.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { FooterComponent } from "./_shared/footer/footer.component";
import { HeaderComponent } from "./_shared/header/header.component";
import { AuthInterceptorService } from "./_services";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SidenavListComponent } from "./_shared/sidenav-list/sidenav-list.component";
import { CreateTicketByQRComponent } from "./create-ticket-by-qr/create-ticket-by-qr.component";
import { QRTicketListComponent } from "./qrticket-list/qrticket-list.component";
import {ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
 
  declarations: [
    AppComponent,
    CreateTicketByQRComponent,
    QRTicketListComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    AdminModule,
    RouterModule,
    BrowserModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: "toast-bottom-right",
      preventDuplicates: false,
      newestOnTop: true,
      tapToDismiss: true,
      progressBar: true,
      progressAnimation: "increasing",
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
