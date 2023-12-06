import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ToasterService, AdminService, AppService } from "src/app/_services";
declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: "app-all-ticket-details",
  templateUrl: "./all-ticket-details.component.html",
  styleUrls: ["./all-ticket-details.component.css"],
})
export class AllTicketDetailsComponent {

  formFields: any;
  dynamicForm!: FormGroup;
  userCreated: any = localStorage.getItem("user-created");
  private formDataSubscription: Subscription = new Subscription();
  incr: any = 0;
  subformdata: any = [];
  nosubform: any = [];
  linkFormData: any = [];
  inid_id: any;
  DetailedArray: any;
  fmls_id: any;
  linkedData: any;
  columnLabelsData: any = [];
  columnLabelsValues: any = [];
  ShowLinkedData: boolean = false;
  incidentData: any;
  labels: any = [];
  mainDetailedArray: any = [];
  incidentDataAttachment:any=[];
  user: any;
  hksd_id: any;
  userRole: any;
  hrsd_id: any;
  roleAcc: any;
  type: any;
  ticketData:any;
  ticketNo:any;
  userName:any;
  
  constructor(
    private toaster: ToasterService,
    private service: AppService,
    public dialog: MatDialog,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    // this.service.user.subscribe((res: any) => {
    //   if (res != null) {
    //     this.user = JSON.parse(res);
    //     this.userRole = this.user.roleName;
    //     if (this.userRole == "enduser") {
    //       this.roleAcc = "50006";
    //     } else if (this.userRole == "Housekeeping") {
    //       this.roleAcc = "50007";
    //     } else if (this.userRole == "Administrator") {
    //       this.roleAcc = "50008";
    //     }
    //     else if(this.userRole == 'HR'){
    //       this.roleAcc = "50008";
    //      }
    //      else if(this.userRole == 'IT Enginner'){
    //       this.roleAcc = "50008";
    //      }
    //     else if(this.userRole == 'Accountant'){
    //       this.roleAcc = "50006";
    //      }
    //      else if(this.userRole == 'Procurement'){
    //       this.roleAcc = "50006";
    //      }
    //   }
    // });
    if (!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
  }

  ngOnInit(): void {
   
    var paramData = this.route.snapshot.params;
    this.type = paramData["type"];
    
      if (this.type == 1) {
        this.inid_id = paramData["id"];
      } else if (this.type == 2) {
        this.hksd_id = paramData["id"];
      } else if (this.type == 3) {
        this.hrsd_id = paramData["id"];
      }
      else if (this.type == 4) {
        this.inid_id = paramData["id"];
      }
      else if (this.type == 5) {
        this.inid_id = paramData["id"];
      }
      this.getFormDataById();
  }

  getFormDataById(): void {
    
    this.roleAcc="";
    if (this.inid_id!=null) {
      this.roleAcc = "50006";
      this.formDataSubscription.add(
        this.adminService.getFormByID(this.roleAcc).subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.formFields = res.rows;
              if (this.formFields.length != 0) {
                this.formFields.forEach((element2: any) => {
                  this.labels.push(element2.column_label);
                });
                this.incidentlist(this.inid_id, this.hksd_id, this.hrsd_id);
              }
              this.toaster.success(res.message);
            } else {
              this.toaster.error(res.message);
            }
          },
          (error: any) => {
            this.toaster.error(`${error.status} ${error.statusText}`);
          }
        )
      );
    }
    else if (this.hksd_id!=null) {
      this.roleAcc = "50007";
      this.formDataSubscription.add(
        this.adminService.getFormByID(this.roleAcc).subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.formFields = res.rows;
              if (this.formFields.length != 0) {
                this.formFields.forEach((element2: any) => {
                  this.labels.push(element2.column_label);
                });
                this.incidentlist(this.inid_id, this.hksd_id, this.hrsd_id);
              }
              this.toaster.success(res.message);
            } else {
              this.toaster.error(res.message);
            }
          },
          (error: any) => {
            this.toaster.error(`${error.status} ${error.statusText}`);
          }
        )
      );
    }
    else if (this.hrsd_id != null) {
      this.roleAcc = "50008";
      this.formDataSubscription.add(
        this.adminService.getFormByID(this.roleAcc).subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.formFields = res.rows;
              if (this.formFields.length != 0) {
                this.formFields.forEach((element2: any) => {
                  this.labels.push(element2.column_label);
                });
                this.incidentlist(this.inid_id, this.hksd_id, this.hrsd_id);
              }
              this.toaster.success(res.message);
            } else {
              this.toaster.error(res.message);
            }
          },
          (error: any) => {
            this.toaster.error(`${error.status} ${error.statusText}`);
          }
        )
      );
    }
  }

  //Item details or Item list
  incidentlist(inid: any, hksid: any, hrsdid: any) {
    ;
    this.incidentData = [];
    this.incidentDataAttachment=[];
    this.ticketData=null;
    if (inid != null && this.labels.length != 0) {
      var patchpromise = new Promise<any>((resolve, reject) => {
        this.adminService
          .getIncidentdetailsbyId(this.inid_id)
          .subscribe((res: any) => {
            this.incidentData = res.result;
            this.incidentDataAttachment=res.attachment;
            this.ticketData=this.incidentData[0];
            this.ticketNo=this.ticketData['Call Type'].slice(0,3) + "-" +this.ticketData.inid_id;
            this.userName=this.incidentData[1]['User Name'][0]['User Name'];
            this.incidentData.map((res: any) => {});
            resolve("patching");
          });
      });

      patchpromise.then((res: any) => {
        this.pachformdata();
      });
    } else if (hksid != null && this.labels.length != 0) {
      var patchpromise = new Promise<any>((resolve, reject) => {
        this.adminService
          .getHousekeepingIncidentdetailsbyId(this.hksd_id)
          .subscribe((res: any) => {
            this.incidentData = res.result;
            this.incidentDataAttachment=res.attachment;
            this.ticketData=this.incidentData[0];
            this.ticketNo=this.ticketData['Call Type'].slice(0,3) + "-" +this.ticketData.hksd_id;
            this.incidentData.map((res: any) => {});
            resolve("patching");
          });
      });

      patchpromise.then((res: any) => {
        this.pachformdata();
      });
    } else if (hrsdid != null && this.labels.length != 0) {
      var patchpromise = new Promise<any>((resolve, reject) => {
        this.adminService
          .getHRServiceIncidentdetailsbyId(this.hrsd_id)
          .subscribe((res: any) => {
            this.incidentData = res.result;
            this.incidentDataAttachment=res.attachment;
            this.ticketData=this.incidentData[0];
            this.ticketNo=this.ticketData['Call Type'].slice(0,3) + "-" +this.ticketData.hrsd_id;
            this.incidentData.map((res: any) => {});
            resolve("patching");
          });
      });

      patchpromise.then((res: any) => {
        this.pachformdata();
      });
    }
  }
  pachformdata() {
    setTimeout(() => {
      if (this.labels.length != 0 && this.incidentData.length != 0) {
    if(this.inid_id != null){
      this.mainDetailedArray = this.incidentData.map((obj: any) => {
        let filteredObj: { [key: string]: any } = {};
        this.labels.forEach((key: string) => {
          if (obj.hasOwnProperty(key)) {
            filteredObj[key] = obj[key];
          }
        });
        return filteredObj;
      });
      this.DetailedArray = this.mainDetailedArray[0];
      if (this.incidentData[1]["User Name"].length != 0) {
        this.DetailedArray.From =
          this.incidentData[1]["User Name"][0]["User Name"];
      }
      if(this.incidentData[2]['Affected Assign Product'].length != 0)
      {
        this.DetailedArray['Affected Product'] =
        this.incidentData[2]["Affected Assign Product"][0]["Affected Assign Product"];
      }
    }
     else if(this.hksd_id!=null)
     {
      this.mainDetailedArray = this.incidentData.map((obj: any) => {
        let filteredObj: { [key: string]: any } = {};
        this.labels.forEach((key: string) => {
          if (obj.hasOwnProperty(key)) {
            filteredObj[key] = obj[key];
          }
        });
        return filteredObj;
      });
      this.DetailedArray = this.mainDetailedArray[0];
      if (this.incidentData[0]["Config Item"].length != 0) {
        this.DetailedArray['Config Item'] =
          this.incidentData[0]['Config Item'];
      }

     }
     else if(this.hrsd_id != null){
      this.mainDetailedArray = this.incidentData.map((obj: any) => {
        let filteredObj: { [key: string]: any } = {};
        this.labels.forEach((key: string) => {
          if (obj.hasOwnProperty(key)) {
            filteredObj[key] = obj[key];
          }
        });
        return filteredObj;
      });
      this.DetailedArray = this.mainDetailedArray[0];
      if (this.incidentData[0].cicd_id != "") {
        this.DetailedArray.Service =
          this.incidentData[0].cicd_id;
      }
      if (this.incidentData[0].assignto != "") {
        this.DetailedArray['Assigned To'] =
          this.incidentData[0].assignto;
      }
     }
        //}
      }
    }, 2000);
  }
  goBack() {
    this.router.navigateByUrl("/allTickets");
  }
  
  downloadPdf(pdfUrl: string, pdfName: string) {
    FileSaver.saveAs(pdfUrl, pdfName);
  }



  openDoc(pdfUrl: string, startPage: number) {
    window.open(pdfUrl + '#page=' + startPage, '_blank', '',); //true value removed form here if any issue add and check
  }
  updateTicketDetails() {
    
    if (this.inid_id != null && this.type == 1) {
      this.router.navigate([
        "/it-sm/update-tickets-by-type",
        this.type,
        this.inid_id,
      ]);
    } else if (this.hksd_id != null && this.type == 2) {
      this.router.navigate([
        "/it-sm/update-tickets-by-type",
        this.type,
        this.hksd_id,
      ]);
    } else if (this.hrsd_id != null && this.type == 3) {
      this.router.navigate([
        "/it-sm/update-tickets-by-type",
        this.type,
        this.hrsd_id,
      ]);
    }
    else if (this.inid_id != null && this.type == 4) {
      this.router.navigate([
        "/it-sm/update-tickets-by-type",
        this.type,
        this.inid_id,
      ]);
    }
    else if (this.inid_id != null && this.type == 5) {
      this.router.navigate([
        "/it-sm/update-tickets-by-type",
        this.type,
        this.inid_id,
      ]);
    }
  }
  ngOnDestroy(): void {
    this.formDataSubscription.unsubscribe();
  }
}
