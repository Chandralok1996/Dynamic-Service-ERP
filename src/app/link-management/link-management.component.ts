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
import { Route, Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-link-management",
  templateUrl: "./link-management.component.html",
  styleUrls: ["./link-management.component.css"],
})
export class LinkManagementComponent {
  formData: any;
  dataSource: any;
  userCreated: any = localStorage.getItem("user-created");
  pagination: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: any = [];
  private formListSubscription: Subscription = new Subscription();
  tempvar: any;
  copyDisplayColumn: any = ['sr','formName','linkedForm'];
  temparray: any = [];
  formlabel: any;
  formfield: any = [];
  getkeys: any;
  x: any = [];
  orgkeys: any;
  fmlsid: any;
  linkListData: any;
  id: any;
  linkFormData: any;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private toaster: ToasterService,
    private service: AppService,
    private router: Router
  ) {
    this.userCreated = JSON.parse(this.userCreated);
    this.pagination = this.service.pagination;

    console.log(this.id);
  }
  public hello: any;
  isMenuOpened: boolean = false;

  ngOnInit(): void {
  
    this.getLinkList();
  }

  // getFormList() {
  //   
  //   var a = this.adminService.getFormList().subscribe((res: any) => {
  //     console.log(res.status);
  //     this.formListData = res.result;
  //   });
  // }
  getLinkList(): void {
      
   
      this.adminService.getLinkFormList().subscribe((res: any) => {
        if (res.status == 200) {
       this.linkFormData=res.rows;
          this.dataSource = new MatTableDataSource(this.linkFormData);
          this.dataSource.paginator = this.paginator;
          this.toaster.success(res.message);
        } else {
          this.toaster.error(res.message);
        }
      })
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
//   this.tempvar=this.formfield.map((item:any)=>{

//   return {
//     "keyName":item,
//     "check":true
//   }
    
// })
//   console.log(this.tempvar);
//   this.tempvar=this.tempvar.map((res:any)=>{
//   if(res.keyName=="astd_id" ||res.keyName=="Asset Name" || res.keyName=="Asset Type" || res.keyName=="Category" || res.keyName=="Vendor Name" || res.keyName=="Status" )
//   {
//     return {
//       "keyName":res.keyName,
//       "check":true
//     }
//   }
//   else
//   {
//     return {
//       "keyName":res.keyName,
//       "check":false
//     }
//   }
 
// })
// // this.copyDisplayColumn=this.tempvar
// this.orgkeys=this.tempvar
// this.getkeys=this.tempvar.filter((res:any)=>{
//   return res.check==true
// })
// console.log(this.getkeys);
// this.x;
// for(var i=0;i<this.getkeys.length;i++)
// {
//       this.x.push(this.getkeys[i].keyName)
// }

// console.log(this.x);
// this.x.push('Action')
// this.copyDisplayColumn=this.x;
// })
//   }

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.formListSubscription.unsubscribe();
  }
}
