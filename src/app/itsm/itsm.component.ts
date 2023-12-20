import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService, ToasterService, AppService } from "../_services";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: "app-itsm",
  templateUrl: "./itsm.component.html",
  styleUrls: ["./itsm.component.css"],
})
export class ItsmComponent {
  links = [
    //  {status:'',value: "All Tickets"},
    { status: "My", value: "My Tickets" },
    { status: "assigned", value: "Grouped Tickets" },
    // {status:'unassigned',value:"Unassigned Tickets"},
    { status: "Closed", value: "Closed Tickets" },
  ];
  activeLink = "My";
  filterData1='7';
  filterData=[{id: "Last 7 Days", value: "7" },{id: "Last 14 Days", value: "14" },{id: "Select Date", value: ""}]
  background: any = "";
  dataSource: any;
  currentTime: any;
  sDate:any;
  eDate:any;
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
  statusData='Open';
  showHRIncident: boolean = false;
  columnValues: any = [];
  showHousekeepingIncident: boolean = false;
  showIncident: boolean = false;
  labels: any = [];
  detailsdata: any;
  incid: any;
  searchTerm = "";
  formFields: any;
  form5:any;
  showStatusFilter: boolean = false;
  MyTicetListData: any;
  filteredCardData: any[] = [];
  labelsArray: any = [];
  labelsArrayData: any = [];
  assignedTicketList: any = [];
  groupTicketList: any = [];
  ticketListData: any = [];
  status1 = "My";
  error: any;
  status = [
    { name: "Open", value: "Open" },
    { name: "In Progress", value: "In progress" },
    { name: "Closed", value: "Closed" },
  ];
  type: any;
  types = [
    { id: 1, name: "IT" },
    { id: 2, name: "Housekeeping" },
    { id: 3, name: "HR" },
    { id: 4, name: "Account" },
    { id: 5, name: "Procurement" },
  ];
  user: any;
  userRole: any;
  roleAcc: any;
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
        if (this.userRole == "IT Engineer") {
          this.type = 1;
        } else if (this.userRole == "Housekeeping") {
          this.type = 2;
        } else if (this.userRole == "HR") {
          this.type = 3;
        } else if (this.userRole == "Accountant") {
          this.type = 1;
        }
      }
    });
    // this.service.user.subscribe((res:any)=>{
    //   if(res!=null){
    //     this.user=JSON.parse(res);
    //     this.userRole = this.user.roleName;

    //   }
    // })
  }
  ngOnInit(): void {
    //  this.getFormDataById();
    // this.incidentlistData('');
    this.form5 = this.formBuilder.group({
      sDate: ["", Validators.required],
      eDate: ["", Validators.required],
    });
    this.getTicketList('Open','7','','','');
    // this.getActiveLinkStatus('My');
  }
  toggleBackground() {
    this.background = this.background ? "" : "primary";
  }
  getTicketList(status:any,days:any,sDate:any,eDate:any,type:any) {
    
    this.incidentlistdata = [];
    this.MyTicetListData = [];
    this.assignedTicketList = [];
    this.ticketListData = [];
    this.groupTicketList = [];
    var a = this.adminService.getTicketListOnFilter(status,days,sDate,eDate,type).subscribe((res: any) => {
      console.log(res.status);
      if (res.status == 200) {
        this.MyTicetListData = res.myTickets;
        if (this.MyTicetListData.length != 0) {
          if (this.userRole == "IT Engineer") {
            if (this.status1 == "My") {
              this.showStatusFilter = true;
              this.showHRIncident = true;
              this.showIncident = false;
              this.showHousekeepingIncident = false;
              this.ticketListData = this.MyTicetListData[2].hrMyTickets;
              this.incidentlistdata = this.ticketListData;
            } else if (this.status1 == "assigned") {
              this.showStatusFilter = false;
              this.showIncident = true;
              this.showHRIncident = false;
              this.showHousekeepingIncident = false;
              this.assignedTicketList = res.groupTickets;
              this.incidentlistdata = this.assignedTicketList.filter((ele:any)=>(ele.Status=='In progress' || ele.Status=='Open'));
            } else if (this.status1 == "Closed") {
              this.showStatusFilter = false;
              this.showIncident = true;
              this.showHRIncident = false;
              this.showHousekeepingIncident = false;
              this.incidentlistData("Closed");
            }
          } else if (this.userRole == "Housekeeping") {
            if (this.status1 == "My") {
              this.showStatusFilter = true;
              this.showHRIncident = true;
              this.showIncident = false;
              this.showHousekeepingIncident = false;
              this.ticketListData = this.MyTicetListData[2].hrMyTickets;
              this.incidentlistdata = this.ticketListData;
            } else if (this.status1 == "assigned") {
              this.showStatusFilter = false;
              this.showHousekeepingIncident = true;
              this.showHRIncident = false;
              this.showIncident = false;

              this.assignedTicketList = res.groupTickets;
              this.incidentlistdata = this.assignedTicketList.filter((ele:any)=>(ele.Status=='In progress' || ele.Status=='Open'));

            } else if (this.status1 == "Closed") {
              this.showStatusFilter = false;
              this.showHousekeepingIncident = true;
              this.showHRIncident = false;
              this.showIncident = false;
              this.incidentlistData("Closed");
            }
          } else if (this.userRole == "HR") {
            if (this.status1 == "My") {
              this.showStatusFilter = true;
              this.showIncident = true;
              this.showHousekeepingIncident = false;
              this.showHRIncident = false;

              this.ticketListData = this.MyTicetListData[0].incMyTickets;
              this.incidentlistdata = this.ticketListData;
            } else if (this.status1 == "assigned") {
              this.showStatusFilter = false;
              this.showHRIncident = true;
              this.showHousekeepingIncident = false;

              this.showIncident = false;
              this.assignedTicketList = res.groupTickets;
              this.incidentlistdata = this.assignedTicketList.filter((ele:any)=>(ele.Status=='In progress' || ele.Status=='Open'));

            } else if (this.status1 == "Closed") {
              this.showStatusFilter = false;
              this.showHRIncident = true;
              this.showHousekeepingIncident = false;

              this.showIncident = false;
              this.incidentlistData("Closed");
            }
          } else if (this.userRole == "Accountant") {
            if (this.status1 == "My") {
              this.showStatusFilter = true;
              this.showIncident = true;
              this.showHousekeepingIncident = false;
              this.showHRIncident = false;

              this.ticketListData = this.MyTicetListData[0].incMyTickets;
              this.incidentlistdata = this.ticketListData;
            } else if (this.status1 == "assigned") {
              this.showStatusFilter = false;
              this.showHRIncident = true;
              this.showHousekeepingIncident = false;

              this.showIncident = false;
              this.assignedTicketList = res.groupTickets;
              this.incidentlistdata = this.assignedTicketList.filter((ele:any)=>(ele.Status=='In progress' || ele.Status=='Open'));

            } else if (this.status1 == "Closed") {
              this.showStatusFilter = false;
              this.showHRIncident = true;
              this.showHousekeepingIncident = false;

              this.showIncident = false;
              this.incidentlistData("Closed");
            }
           } 
           //else if (this.userRole == "Guest") {
          //   if (this.status1 == "My") {
          //     this.showStatusFilter = false;
          //     this.showHousekeepingIncident = true;
          //     this.showHRIncident = false;
          //     this.showIncident = false;
          //     this.ticketListData = this.MyTicetListData[1].hkMyTickets;
          //     this.incidentlistdata = this.ticketListData;
          //   } else if (this.status1 == "assigned") {
          //     this.showStatusFilter = true;
          //     this.showHousekeepingIncident = true;
          //     this.showHRIncident = false;
          //     this.showIncident = false;
          //     this.assignedTicketList = res.assigntoTickets;
          //     this.incidentlistdata = this.assignedTicketList;
          //   } else if (this.status1 == "Closed") {
          //     this.showStatusFilter = false;
          //     this.showHousekeepingIncident = true;
          //     this.showHRIncident = false;
          //     this.showIncident = false;
          //     this.incidentlistData("Closed");
          //   }
          // }
        }

        // this.groupTicketList = res.groupTickets;
      }
    });
  }
  onSubmit(){
    
    if(this.form5.invalid)
    {
      return;
    }

    this.getTicketList(this.statusData,this.filterData1,this.form5.value.sDate,this.form5.value.eDate,'');
  }
  getFilterList(value:any)
  {
    if(value==''){
      this.show=true;
      this.getTicketList('Open','',this.sDate,this.eDate,'');
    }
    else{
      this.show=false;
      this.getTicketList(this.statusData,this.filterData1,'','','');
    }
  }
  incidentlistData(status: any) {
    this.incidentlistdata = [];
    if (
      this.type == 1 &&
      (status == "" ||
        status == "Closed" ||
        status == "Open" ||
        status == "inprogress")
    ) {
      this.showIncident = true;
      this.showHousekeepingIncident = false;
      this.adminService.incidentList(status).subscribe((res: any) => {
        console.log(res);
        this.incidentlistdata = res.result;
       
      });
    } else if (
      this.type == 2 &&
      (status == "" ||
        status == "Closed" ||
        status == "Open" ||
        status == "inprogress")
    ) {
      this.showHousekeepingIncident = true;
      this.showIncident = false;
      this.adminService.getHouseKeepingTickets(status).subscribe((res: any) => {
        console.log(res);
        this.incidentlistdata = res.result;
      });
    } else if (
      this.type == 3 &&
      (status == "" ||
        status == "Closed" ||
        status == "Open" ||
        status == "inprogress")
    ) {
      this.showHRIncident = true;
      this.showHousekeepingIncident = false;
      this.showIncident = false;
      this.adminService.getHRServiceTicketList(status).subscribe((res: any) => {
        console.log(res);
        this.incidentlistdata = res.result;
      });
    }
  }
  getActiveLinkStatus(status: any) {
    this.incidentlistdata = [];
    this.status1 = status;
    if(this.status1=='assigned')
    {
      this.statusData = '';
      this.getTicketList(this.statusData,'7','','','');
    }
    else{
    this.statusData = 'Open';
    this.getTicketList(this.statusData,'7','','','');
    }
    // else if(status=='assigned')
    // {
    //   this.incidentlistdata = this.assignedTicketList;
    // }
  }
  getStatusWiseTicketData(data: any) {
    this.incidentlistdata = [];
    this.statusData = data;
    this.incidentlistData(this.statusData);
  }
  applyFilter() {
    //  const filterValue = event.target ? (event.target as HTMLInputElement).value : event;
    if (this.searchTerm == "") {
      this.incidentlistData("");
    } else {
      this.filteredCardData = this.incidentlistdata.filter((ele: any) =>
        Object.keys(ele).some((k) =>
          ele[k].toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
      this.incidentlistdata = this.filteredCardData;
    }
  }

  gotoincdetails(inid: any) {
    this.router.navigate(["/it-sm/update-tickets-by-type", this.type, inid]);
  }
  gotoincHouseKeepingdetails(hksdid: any) {
    this.router.navigate(["/it-sm/update-tickets-by-type", this.type, hksdid]);
  }
  gotoincHRdetails(hrsdid: any) {
    ;
    this.router.navigate(["/it-sm/update-tickets-by-type", this.type, hrsdid]);
  }
}
