import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { AdminService, AppService, ToasterService } from "src/app/_services";

@Component({
  selector: 'app-all-ticket-list',
  templateUrl: './all-ticket-list.component.html',
  styleUrls: ['./all-ticket-list.component.css']
})
export class AllTicketListComponent {
 
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
  user:any;
  userRole:any;
  roleAcc:any;
  type=1;
  types=[ { id: 1, name: 'IT' },
  { id: 2, name: 'Housekeeping' },
  { id: 3, name: 'HR' },

];
  constructor(
    private adminService: AdminService,
    private toaster: ToasterService,
    private service: AppService,
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
       else if(this.userRole == 'IT Enginner'){
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
  //  this.getFormDataById();
    this.incidentlistData('');
  }
  toggleBackground() {
    this.background = this.background ? "" : "primary";
  }
  // getFormDataById(): void {
  //   ;
  //   this.formDataSubscription.add(
  //     this.adminService.getFormByID(this.roleAcc).subscribe(
  //       (res: any) => {
  //         if (res.status == 200) {
  //           this.formFields = res.rows;
        
         

  //           this.toaster.success(res.message);
  //         } else {
  //           this.toaster.error(res.message);
  //         }
  //       }
       
  //     )
  //   );
  // }
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
  getType(){
    
    this.incidentlistdata = [];
    this.statusData='';
    this.incidentlistData('');
   
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
