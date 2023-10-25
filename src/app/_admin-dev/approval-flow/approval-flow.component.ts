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
  selector: "app-approval-flow",
  templateUrl: "./approval-flow.component.html",
  styleUrls: ["./approval-flow.component.css"],
})
export class ApprovalFlowComponent {
  formData: any;
  dataSource: any;
  userCreated: any = localStorage.getItem("user-created");
  pagination: any;
  orgId=901;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  copyDisplayColumn: any = ["sr","Approval_name","Form_name","Action"];

 

  approvalListData: any;

  constructor(
    private adminService: AdminService,
    private toaster: ToasterService,
    private service: AppService,
    private router: Router
  ) {
    this.userCreated = JSON.parse(this.userCreated);
    this.pagination = this.service.pagination;
  }
  public hello: any;
  isMenuOpened: boolean = false;

  ngOnInit(): void {
    this.approvalList(this.orgId);
  }

  approvalList(org:any) {
    
    var a = this.adminService.getapprovalList(org).subscribe(
      (res: any) => {
        if(res.status == 200)
        {
          console.log(res);
          this.approvalListData = res.result;
          console.log(a);
  
          var keyarr: any = [];
         
          this.dataSource = new MatTableDataSource(this.approvalListData);
          this.dataSource.paginator = this.paginator;
        }
        else{
          this.toaster.error("Something went wrong,Please contact to your administrator");
        }
      
      })
  }

  OpenUpdate(id:any,data1:any){

this.router.navigate(['/admin/updateApproval',id])
  }
  userupdate(data: any) {
    console.log(data);
    this.router.navigate(["/user-master/update", data]);
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

  // ngOnDestroy(): void {
  //   this.formListSubscription.unsubscribe();
  // }
}
