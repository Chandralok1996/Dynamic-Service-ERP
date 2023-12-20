import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { AdminService, AppService, ToasterService } from "src/app/_services";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-all-ticket-list",
  templateUrl: "./all-ticket-list.component.html",
  styleUrls: ["./all-ticket-list.component.css"],
})
export class AllTicketListComponent {
  links = [
    // {status:'',value: "All Tickets"},
    { status: "My", value: "My Tickets" },
    { status: "assigned", value: "Grouped Tickets" },
    // {status:'unassigned',value:"Unassigned Tickets"},
    { status: "Closed", value: "Closed Tickets" },
  ];
  activeLink = "My";
  background: any = "";
  showStatusFilter: boolean = false;
  dataSource: any;
  currentTime: any;
  startDate = new Date(2000, 0, 1);
  endDate = new Date(2023, 0, 1);
  show = false;
  incidentlistdata: any;
  userCreated: any;
  private formDataSubscription: Subscription = new Subscription();
  pagination: any;
  searchText: string = "";
  keyarr: any = [];
  filteredCards: any;
  columnValues: any = [];
  showHousekeepingIncident: boolean = false;
  showIncident: boolean = false;
  showHRIncident: boolean = false;
  labels: any = [];
  detailsdata: any;
  sDate: any;
  eDate: any;
  status = [
    { name: "Open", value: "Open" },
    { name: "In Progress", value: "In progress" },
    { name: "Closed", value: "Closed" },
  ];
  incid: any;
  searchTerm = "";
  statusData = "Open";
  formFields: any;
  filteredCardData: any[] = [];
  labelsArray: any = [];
  labelsArrayData: any = [];
  filterData1 = "7";
  filterData = [
    { id: "Last 7 Days", value: "7" },
    { id: "Last 14 Days", value: "14" },
    { id: "Select Date", value: "" },
  ];
  user: any;
  userRole: any;
  form5: any;
  roleAcc: any;
  MyTicetListData: any = [];
  assignedTicketList: any = [];
  groupTicketList: any = [];
  ticketListData: any = [];
  type = 'it';
  types = [
    { id: 'it', name: "IT" },
    { id: 'hk', name: "Housekeeping" },
    { id: 'hr', name: "HR" },
  ];
  constructor(
    private adminService: AdminService,
    private toaster: ToasterService,
    private service: AppService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.service.user.subscribe((res: any) => {
      if (res != null) {
        this.user = JSON.parse(res);
        this.userRole = this.user.roleName;
        if (this.userRole == "enduser") {
          this.roleAcc = "50006";
        } else if (this.userRole == "Housekeeping") {
          this.roleAcc = "50007";
        } else if (this.userRole == "Administrator") {
          this.roleAcc = "50006";
        } else if (this.userRole == "HR") {
          this.roleAcc = "50008";
        } else if (this.userRole == "IT Engineer") {
          this.roleAcc = "50008";
        } else if (this.userRole == "Accountant") {
          this.roleAcc = "50006";
        } else if (this.userRole == "Procurement") {
          this.roleAcc = "50006";
        }
      }
    });
  }
  ngOnInit(): void {
    this.form5 = this.formBuilder.group({
      sDate: ["", Validators.required],
      eDate: ["", Validators.required],
    });
    this.getTicketList("Open", "7", "", "",'it');
  }
  toggleBackground() {
    this.background = this.background ? "" : "primary";
  }
  getTicketList(status: any, days: any, sDate: any, eDate: any,type:any) {
    ;
    this.incidentlistdata = [];
    this.ticketListData = [];
    var a = this.adminService
      .getTicketListOnFilter(status, days, sDate, eDate,this.type)
      .subscribe((res: any) => {
        console.log(res.status);
        if (res.status == 200) {
        
            if (this.type == 'it') {
            
                this.showHRIncident = false;
                this.showIncident = true;
                this.showHousekeepingIncident = false;
                this.ticketListData =res.groupTickets;
                this.incidentlistdata = this.ticketListData;
             
            } else if (this.type == 'hk') {
              this.showHRIncident = false;
                this.showIncident = false;
                this.showHousekeepingIncident = true;
                this.ticketListData =res.groupTickets;
                this.incidentlistdata = this.ticketListData;
            } else if (this.type == 'hr') {
              this.showHRIncident = true;
                this.showIncident = false;
                this.showHousekeepingIncident = false;
                this.ticketListData =res.groupTickets;
                this.incidentlistdata = this.ticketListData;
            }
           
          }

          // this.groupTicketList = res.groupTickets;
        
      });
  }
  // incidentlistData(status: any) {
  //   this.incidentlistdata = [];
  //   if (
  //     this.type == 'it' &&
  //     (status == "" ||
  //       status == "Closed" ||
  //       status == "Open" ||
  //       status == "inprogress")
  //   ) {
  //     this.showIncident = true;

  //     this.showHousekeepingIncident = false;
  //     this.adminService.incidentList(status).subscribe((res: any) => {
  //       console.log(res);
  //       this.incidentlistdata = res.result;
      
  //     });
  //   } else if (
  //     this.type == 'hk' &&
  //     (status == "" ||
  //       status == "Closed" ||
  //       status == "Open" ||
  //       status == "inprogress")
  //   ) {
  //     this.showHousekeepingIncident = true;

  //     this.showIncident = false;
  //     this.adminService.getHouseKeepingTickets(status).subscribe((res: any) => {
  //       console.log(res);
  //       this.incidentlistdata = res.result;
       
  //     });
  //   } else if (
  //     this.type == 'hr' &&
  //     (status == "" ||
  //       status == "Closed" ||
  //       status == "Open" ||
  //       status == "inprogress")
  //   ) {
  //     this.showHRIncident = true;

  //     this.showHousekeepingIncident = false;
  //     this.showIncident = false;
  //     this.adminService.getHRServiceTicketList(status).subscribe((res: any) => {
  //       console.log(res);
  //       this.incidentlistdata = res.result;
  //     });
  //   }
  // }
  getType(id:any) {
    
    this.incidentlistdata = [];
    this.statusData = 'Open';
    this.filterData1='7';
    this.sDate='';
    this.eDate='';
    this.show=false;
   if(id=='it')
   {
    this.getTicketList(this.statusData,this.filterData1,this.sDate,this.eDate,id)
   }
   else if(id=='hk')
   {
    this.getTicketList(this.statusData,this.filterData1,this.sDate,this.eDate,id)
   }
   if(id=='hr')
   {
    this.getTicketList(this.statusData,this.filterData1,this.sDate,this.eDate,id)
   }
  }

  applyFilter() {
    //  const filterValue = event.target ? (event.target as HTMLInputElement).value : event;
    if (this.searchTerm == "") {
      this.getTicketList("Open", "7",'', "",this.type);
    } else {
      this.filteredCardData = this.incidentlistdata.filter((ele: any) =>
        Object.keys(ele).some((k) =>
          ele[k].toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
      this.incidentlistdata = this.filteredCardData;
    }
  }
  getStatusWiseTicketData(data: any) {
    this.incidentlistdata = [];
    this.filterData1='7';
    this.show=false;
    this.statusData = data;
    this.getTicketList(this.statusData,this.filterData1,'','',this.type)
  //  this.incidentlistData(this.statusData);
    // this
  }
  // getActiveLinkStatus(status:any){
  //   
  //   this.incidentlistdata = [];

  //   this.status1 = status;
  //   if(this.status1=='assigned')
  //   {
  //     this.statusData = '';
  //     this.getTicketList(this.statusData,'7','','');
  //   }
  //   else if(this.status1=='Closed')
  //   {
  //     this.showStatusFilter=false;
  //     this.getTicketList(this.statusData,'7','','');
  //   }
  //   else if(this.status1=='My'){
  //   this.showStatusFilter=false;
  //   this.statusData = 'Open';
  //   this.getTicketList(this.statusData,'7','','');
  //   }
  // }
  getFilterList(value: any) {
    this.incidentlistdata = [];
    if (value == "") {
      this.show = true;
      this.getTicketList("Open", "", this.sDate, this.eDate,this.type);
    } else {
      this.show = false;
      this.getTicketList(this.statusData, this.filterData1, "", "",this.type);
    }
  }
  onSubmit(){
    
    if(this.form5.invalid)
    {
      return;
    }

    this.getTicketList(this.statusData,this.filterData1,this.form5.value.sDate,this.form5.value.eDate,this.type);
    this.form5.reset();
    this.form5.value.sDate='';
    this.form5.value.eDate='';
  }
  gotoincdetails(inid: any) {
    //this.incid = inid.split("-");
    //  (this.detailsdata = this.incid[1]),

    this.router.navigate(["/it-sm/details-tickets-by-type", this.type, inid]);
  }
  gotoincHouseKeepingdetails(hksdid: any) {
    this.router.navigate(["/it-sm/details-tickets-by-type", this.type, hksdid]);
  }
  gotoincHRdetails(hrsd_id: any) {
    this.router.navigate([
      "/it-sm/details-tickets-by-type",
      this.type,
      hrsd_id,
    ]);
  }
}
