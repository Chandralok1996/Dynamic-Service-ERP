import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { FormBuilder, Validators } from "@angular/forms";
import { AdminService, AppService, ToasterService } from "../_services";
import { environment } from "src/environments/environment.prod";
// const vCardsJS = require("vcards-js");
// const download = require("downloadjs");

@Component({
  selector: "app-qrcode",
  templateUrl: "./qrcode.component.html",
  styleUrls: ["./qrcode.component.css"],
})
export class QRCodeComponent {
  locationList: any;
  formFields: any;
  fmls_id: any;
  fmlsidArray: any = [];
  showThisQR: boolean = false;
  showThisQR1: boolean = false;
  stringQrCode1: string = "";
  urlLink: string='';
  arrayData: any;
  url: string = "http://172.16.15.22:6715/";
  qrCodeData: any;
  constructor(
    private adminService: AdminService,
    private toaster: ToasterService,
    private service: AppService,
    private router: Router,
    public route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getLocationList();
  }

  getLocationList() {
    ;
    this.adminService.getQRCodeLocation().subscribe((res: any) => {
      if (res.status) {
        this.locationList = res.rows;
        this.locationList.forEach((element: any) => {
          if (element.qrloc_id == "2001") {
            this.showThisQR = true;
          }
          if (this.showThisQR == true) {
            if (element.fmls_id != null) {
              this.fmlsidArray.push(element.fmls_id);
            }
            this.arrayData = this.fmlsidArray;
          }
        });
        if (this.arrayData.length != 0) {
           this.getQRCode();
        }
      } else {
        this.toaster.error(res.message);
      }
    });
  }
  getQRCode() {
    
    if (this.arrayData.length != 0) {
      this.arrayData.forEach((element1: any) => {
        if (element1 != null) {
          if (element1 == "50007") {
           
            this.urlLink = this.url+"createTicket/"+element1;
           // this.qrCodeData=this.urlLink;
          }
          else
          {
            this.urlLink =  this.url+"feedback_form";
          }
        }
      });
    }
   
  }
}
