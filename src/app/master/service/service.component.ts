import { Component, ViewChild, ViewChildren } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { AdminService, ToasterService, AppService } from "src/app/_services";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatButton } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { FormGroup, FormControl } from "@angular/forms";
import { Route, Router } from "@angular/router";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  formData: any;
  dataSource: any;
  userCreated: any = localStorage.getItem("user-created");
  pagination: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: any = [];
  private formListSubscription: Subscription = new Subscription();
  tempvar: any;
  copyDisplayColumn: any;
  temparray: any = [];
  itemlistdata: any;
  formID: any = 50002;
  formlabel: any;
  formfield: any = [];
  getkeys: any;
  x: any = [];
  orgkeys: any;
  columnfiled: any = [];
  user:any;
  userRole:any;

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
    
      }

   
      
    }) 
    this.pagination = this.service.pagination;
  }
  public hello: any;
  isMenuOpened: boolean = false;

  ngOnInit(): void {
    this.serviceItemlist();
    //  this.itemlist()
    //  this.getformfield()
  }

  //   getformfield()
  //   {
  //   console.log(this.formID);
  //   this.adminService.getFormByID(this.formID).subscribe((res:any)=>{
  //   console.log(res);
  //   this.formlabel=res.rows
  //   this.formlabel.forEach((element:any) => {
  //   this.formfield.push(element.column_label)
  // });
  //   console.log(this.formfield);
  //   console.log(this.formfield);

  // // this.copyDisplayColumn=this.tempvar

  // this.x.push('Action')
  // this.copyDisplayColumn=this.x;
  // })
  //   }
  serviceItemlist() {
    
    var a = this.adminService.getServiceList().subscribe(
      (res: any) => {
        console.log(res);

        console.log(res.status);
        this.columnfiled = res.result[0];
        console.log(this.columnfiled);

        var emparr: any = [];
        emparr = Object.keys(this.columnfiled);
        console.log(emparr);

        emparr.push("Action");
        this.copyDisplayColumn = emparr;
        this.itemlistdata = res.result;
        this.dataSource = new MatTableDataSource(this.itemlistdata);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.log(error.error.message);
        if (error.error.message == "Token is not provided") {
          this.service.logout();
        }
      }
    );
  }

  serviceUpdate(data: any) {
    console.log(data);
    this.router.navigate(["/service-master/updateService", data]);
  }
  toggler(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  goBack(){
    if(this.userRole == 'enduser')
     {
      this.router.navigate(['/it-sm']);
     }
     else if(this.userRole == 'Housekeeping'){
      this.router.navigate(['/it-sm']);
     }
     else if(this.userRole == 'Administrator'){
      this.router.navigate(['/it-sm/allTickets']);
     }
     else if(this.userRole == 'HR'){
      this.router.navigate(['/it-sm']);
     }
     else if(this.userRole == 'IT Engineer'){
      this.router.navigate(['/it-sm']);
     }
     else if(this.userRole == 'Accountant'){
      this.router.navigate(['/it-sm']);
     }
     else if(this.userRole == 'Procurement'){
      this.router.navigate(['/it-sm']);
     }
     else if(this.userRole == 'Manager'){
      this.router.navigate(['/it-sm/dashboard-card']);
     }
     else if(this.userRole == 'Helpdesk'){
      this.router.navigate(['/it-sm/dashboard-card']);
     }
}
  ngOnDestroy(): void {
    this.formListSubscription.unsubscribe();
  }
}
