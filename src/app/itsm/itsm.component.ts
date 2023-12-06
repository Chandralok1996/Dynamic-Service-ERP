import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService, ToasterService, AppService } from "../_services";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
@Component({
  selector: "app-itsm",
  templateUrl: "./itsm.component.html",
  styleUrls: ["./itsm.component.css"],
})
export class ItsmComponent {
  links = [
    {status:'',value: "All Tickets"},
    // {status:'My',value:"My Tickets"},
    // {status:'assigned',value:"Assigned Tickets"},
    // {status:'unassigned',value:"Unassigned Tickets"},
    {status:'Closed',value:"Closed Tickets"},
  ];
  activeLink = '';
  background: any = "";
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
  statusData:any;
  showHRIncident: boolean = false;
  columnValues: any = [];
  showHousekeepingIncident: boolean = false;
  showIncident: boolean = false;
  labels: any = [];
  detailsdata: any;
  incid: any;
  searchTerm = "";
  formFields: any;
  filteredCardData: any[] = [];
  labelsArray: any = [];
  labelsArrayData: any = [];
  status=[{name:'Open',value:'Open'},{name:'In Progress',value:'inprogress'},{name:'Closed',value:'Closed'}]
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
    private router: Router
  ) {
    this.service.user.subscribe((res: any) => {
      if (res != null) {
        this.user = JSON.parse(res);
        this.userRole = this.user.roleName;
        if (this.userRole == "IT Engineer") 
        {this.type = 1;
        }
       else if (this.userRole == "Housekeeping") {
        this.type = 2;
       
      } else if (this.userRole == "HR") {
        this.type = 3;
       
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
    this.incidentlistData('');
  }
  toggleBackground() {
    this.background = this.background ? "" : "primary";
  }
 
  incidentlistData(status:any) {
    
    this.incidentlistdata=[];
    if (this.type == 1 && (status == '' || status == 'Closed' || status == 'Open' || status == 'inprogress')) {
      this.showIncident = true;
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
      this.showHousekeepingIncident = false;
      this.showIncident = false;
      this.adminService.getHRServiceTicketList(status).subscribe((res: any) => {
        console.log(res);
        this.incidentlistdata = res.result;
      });
    }
  }
  getActiveLinkStatus(status:any){
    this.statusData='';
    this.incidentlistdata = [];
      this.incidentlistData(status);
  
  }
  getStatusWiseTicketData(data:any){
    this.incidentlistdata = [];
    this.statusData=data;
    this.incidentlistData(this.statusData);
  }
  applyFilter() {
    //  const filterValue = event.target ? (event.target as HTMLInputElement).value : event;
    this.filteredCardData = this.incidentlistdata.filter(
      (filteredData: any) =>
        filteredData.inid_id.includes(this.searchTerm.toUpperCase().trim()) ||
        filteredData.Priority.includes(this.searchTerm.toUpperCase().trim())
    );
    console.log(this.filteredCardData);
    this.incidentlistdata = this.filteredCardData;
  }

  gotoincdetails(inid: any) {
    //this.incid = inid.split("-");
    //  (this.detailsdata = this.incid[1]),
    this.router.navigate([
      "/it-sm/update-tickets-by-type",
      this.type,
      inid,
    ]);
   // this.router.navigate(["/it-sm/details-tickets-by-type", this.type, inid]);
  }
  gotoincHouseKeepingdetails(hksdid: any) {
    this.router.navigate([
      "/it-sm/update-tickets-by-type",
      this.type,
      hksdid,
    ]);
   // this.router.navigate(["/it-sm/details-tickets-by-type", this.type, hksdid]);
  }
  gotoincHRdetails(hrsdid: any) {
    this.router.navigate([
      "/it-sm/update-tickets-by-type",
      this.type,
      hrsdid,
    ]);
   // this.router.navigate(["/it-sm/details-tickets-by-type", this.type, hrsdid]);
  }
}
