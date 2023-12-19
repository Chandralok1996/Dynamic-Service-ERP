import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { AdminService, AppService, ToasterService } from "src/app/_services";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-all-ticket-list',
  templateUrl: './all-ticket-list.component.html',
  styleUrls: ['./all-ticket-list.component.css']
})
export class AllTicketListComponent {
 
  links = [
   // {status:'',value: "All Tickets"},
     {status:'My',value:"My Tickets"},
     {status:'assigned',value:"Grouped Tickets"},
    // {status:'unassigned',value:"Unassigned Tickets"},
    {status:'Closed',value:"Closed Tickets"},
  ];
  activeLink = 'My';
  background: any = "";
  showStatusFilter:boolean=false;
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
  showHousekeepingIncident:boolean=false;
  showIncident:boolean=false;
  showHRIncident:boolean=false;
  labels: any = [];
  detailsdata: any;
  status=[{name:'Opened',value:'Open'},{name:'In Progress',value:'inprogress'},{name:'Closed',value:'Closed'}]
  incid: any;
  searchTerm = "";
  statusData:any;
  formFields: any;
  filteredCardData: any[] = [];
  labelsArray:any=[];
  labelsArrayData:any=[];
  filterData1='7';
  filterData=[{id: "Last 7 Days", value: "7" },{id: "Last 14 Days", value: "14" },{id: "Select Date", value: ""}]
  user:any;
  userRole:any;
  form5:any;
  roleAcc:any;
  MyTicetListData:any=[];
  assignedTicketList: any = [];
  groupTicketList: any = [];
  status1 = "My";
  ticketListData: any = [];
  type=1;
  types=[ { id: 1, name: 'IT' },
  { id: 2, name: 'Housekeeping' },
  { id: 3, name: 'HR' },

];
  constructor(
    private adminService: AdminService,
    private toaster: ToasterService,
    private service: AppService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    
    this.service.user.subscribe((res:any)=>{
      if(res!=null){
        this.user=JSON.parse(res);
        this.userRole = this.user.roleName;
       if(this.userRole == 'enduser')
       {
        this.roleAcc = "50006";
       }
       else if(this.userRole == 'Housekeeping'){
        this.roleAcc = "50007";
       }
       else if(this.userRole == 'Administrator'){
        this.roleAcc = "50006";
       }
       else if(this.userRole == 'HR'){
        this.roleAcc = "50008";
       }
       else if(this.userRole == 'IT Engineer'){
        this.roleAcc = "50008";
       }
       else if(this.userRole == 'Accountant'){
        this.roleAcc = "50006";
       }
       else if(this.userRole == 'Procurement'){
        this.roleAcc = "50006";
       }
      }

   
      
    }) 
  }
  ngOnInit(): void {
    this.form5 = this.formBuilder.group({
      sDate: ["", Validators.required],
      eDate: ["", Validators.required],
    });
    this.getTicketList('Open','7','','');
  }
  toggleBackground() {
    this.background = this.background ? "" : "primary";
  }
  getTicketList(status:any,days:any,sDate:any,eDate:any) {
    this.incidentlistdata = [];
    this.MyTicetListData = [];
    this.assignedTicketList = [];
    this.ticketListData = [];
    this.groupTicketList = [];
    var a = this.adminService.getTicketListOnFilter(status,days,sDate,eDate).subscribe((res: any) => {
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
              this.assignedTicketList = res.assigntoTickets;
              this.incidentlistdata = this.assignedTicketList;
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
              this.incidentlistdata = this.assignedTicketList;
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
              this.assignedTicketList = res.assigntoTickets;
              this.incidentlistdata = this.assignedTicketList;
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
              this.assignedTicketList = res.assigntoTickets;
              this.incidentlistdata = this.assignedTicketList;
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
  incidentlistData(status:any) {
    this.incidentlistdata=[];
    if (this.type == 1 && (status == '' || status == 'Closed' || status == 'Open' || status == 'inprogress')) {
      this.showIncident = true;
      this.showStatusFilter = true;
      this.showHousekeepingIncident = false;
      this.adminService.incidentList(status).subscribe((res: any) => {
        console.log(res);
        this.incidentlistdata = res.result;
        // this.incidentlistdata.forEach((element1: any) => {
        //   this.labels = Object.keys(element1);
        //   this.columnValues = Object.values(element1);
        //   this.labelsArrayData.push({
        //     labels:this.labels,
        //     columnValues:this.columnValues
        //   })
        // });

        //   this.dataSource = new MatTableDataSource(this.incidentlistdata);
        // this.dataSource.paginator = this.paginator;
      });
    } else if (this.type == 2 && (status == '' || status == 'Closed' || status == 'Open' || status == 'inprogress')) {
      this.showHousekeepingIncident = true;
      this.showStatusFilter = true;
      this.showIncident = false;
      this.adminService.getHouseKeepingTickets(status).subscribe((res: any) => {
        console.log(res);
        this.incidentlistdata = res.result;
        // this.incidentlistdata.forEach((element1: any) => {
        //   this.labels = Object.keys(element1);
        //   this.columnValues = Object.values(element1);
        //   this.labelsArrayData.push({
        //     labels:this.labels,
        //     columnValues:this.columnValues
        //   })
        // });

        //   this.dataSource = new MatTableDataSource(this.incidentlistdata);
        // this.dataSource.paginator = this.paginator;
      });
    } else if (this.type == 3 && (status == '' || status == 'Closed' || status == 'Open' || status == 'inprogress')) {
      this.showHRIncident = true;
      this.showStatusFilter = true;
      this.showHousekeepingIncident = false;
      this.showIncident = false;
      this.adminService.getHRServiceTicketList(status).subscribe((res: any) => {
        console.log(res);
        this.incidentlistdata = res.result;
      });
    }
  }
  getType(){
    
    this.incidentlistdata = [];
    this.statusData='';
    this.incidentlistData('');
   
  }
 
  applyFilter() {
    
    //  const filterValue = event.target ? (event.target as HTMLInputElement).value : event;
    if(this.searchTerm == '')
    {
      this.incidentlistData('');
    }
    else{
      this.filteredCardData = this.incidentlistdata.filter((ele:any) =>
        Object.keys(ele).some(k => ele[k].toLowerCase().includes(this.searchTerm.toLowerCase())));
        this.incidentlistdata = this.filteredCardData;
     }
   
  }
  getStatusWiseTicketData(data:any){
    this.incidentlistdata = [];
    this.statusData=data;
    this.incidentlistData(this.statusData);
  }
  getActiveLinkStatus(status:any){
    this.incidentlistdata = [];
    this.statusData='';
      this.incidentlistData(status);
  
  }
  gotoincdetails(inid: any) {
    //this.incid = inid.split("-");
  //  (this.detailsdata = this.incid[1]),
  
      this.router.navigate(["/it-sm/details-tickets-by-type",this.type,inid]);
  }
  gotoincHouseKeepingdetails(hksdid:any){
    
    this.router.navigate(["/it-sm/details-tickets-by-type",this.type,hksdid]);
  }
  gotoincHRdetails(hrsd_id:any){
    this.router.navigate(["/it-sm/details-tickets-by-type",this.type,hrsd_id]);

  }
}
