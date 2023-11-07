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
  formID: number = 50006;
  links = [
    "All Tickets",
    "My Tickets",
    "Assigned Tickets",
    "Unassigned Tickets",
    "Closed Tickets",
  ];
  activeLink = this.links[0];
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
  labels: any = [];
  detailsdata: any;
  incid: any;
  searchTerm = "";
  formFields: any;
  filteredCardData: any[] = [];
  labelsArray:any=[];
  labelsArrayData:any=[];

  constructor(
    private adminService: AdminService,
    private toaster: ToasterService,
    private service: AppService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getFormDataById(this.formID);
    this.incidentlistData();
  }
  toggleBackground() {
    this.background = this.background ? "" : "primary";
  }
  getFormDataById(id: number): void {
    debugger;
    this.formDataSubscription.add(
      this.adminService.getFormByID(id).subscribe(
        (res: any) => {
          if (res.status == 200) {
            this.formFields = res.rows;
        
         

            this.toaster.success(res.message);
          } else {
            this.toaster.error(res.message);
          }
        }
        // (error: any) => {
        //   this.toaster.error(`${error.status} ${error.statusText}`);
        // }
      )
    );
  }
  incidentlistData() {
    debugger;
    this.adminService.incidentList().subscribe((res: any) => {
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
    debugger
    //this.incid = inid.split("-");
  //  (this.detailsdata = this.incid[1]),
      this.router.navigate(["/it-sm/details-tickets",inid]);
  }
}
