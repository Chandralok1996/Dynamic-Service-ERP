import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";


import { FormBuilder, Validators } from "@angular/forms";
import { AdminService, AppService, ToasterService } from "../_services";
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from "@techiediaries/ngx-qrcode";
// const vCardsJS = require("vcards-js");
// const download = require("downloadjs");

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QRCodeComponent {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://www.techiediaries.com/';
}
