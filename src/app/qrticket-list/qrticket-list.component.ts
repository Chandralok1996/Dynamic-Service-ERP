import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService, ToasterService, AppService } from "../_services";
import { MatTableDataSource } from "@angular/material/table";
import { AlertMessageDialogComponent } from "../alert-message-dialog/alert-message-dialog.component";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-qrticket-list',
  templateUrl: './qrticket-list.component.html',
  styleUrls: ['./qrticket-list.component.css']
})
export class QRTicketListComponent {
 
  constructor(
    private adminService: AdminService,
    private toaster: ToasterService,
    private service: AppService,
    private router: Router,
    public dialog: MatDialog
  ) {
    
 
  }
  ngOnInit(): void {
    this.openSuccessAlert();
  }
  openSuccessAlert() {
    let dialogRef = this.dialog.open(AlertMessageDialogComponent);
    dialogRef.afterClosed().subscribe((result:any) => {
     
    })
  }
}
