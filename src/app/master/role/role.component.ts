import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdminService, AppService, ToasterService } from 'src/app/_services';
import { AddFormFieldComponent } from 'src/app/_admin-dev/form-master/view-form/add-column.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateFormFieldComponent } from 'src/app/_admin-dev/form-master/view-form/update-column.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  updateFormFieldDialog!: MatDialogRef<UpdateFormFieldComponent>;
  addFormFieldDialog!: MatDialogRef<AddFormFieldComponent>;
  private formDataSubscription: Subscription = new Subscription();
  formID: any = 50001;
  formData: any;
  fmmid:any;
  dataSource: any;
  pagination: any;
  user:any;
  userRole:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['sr', 'id', 'value','action'];

  private formListSubscription: Subscription = new Subscription();
  constructor(private matDialog: MatDialog, private adminService: AdminService, 
    private toaster: ToasterService,public router: Router, private service: AppService, private route : Router) {
    this.pagination = this.service.pagination;
    this.service.user.subscribe((res:any)=>{
      if(res!=null){
        this.user=JSON.parse(res);
        this.userRole = this.user.roleName;
    
      }
    })
   // this.getFormData();
    this.getFormDataById();
  }

  ngOnInit(): void { }

// getFormDataById(id: number): void {
//     this.formDataSubscription.add(
//       this.adminService.getFormByID(this.id).subscribe((res: any) => {
//         if (res.status == 200) {
//           this.formData = res.rows;
//           console.table(this.formData);
//           this.dataSource = new MatTableDataSource(this.formData);
//           this.dataSource.paginator = this.paginator;
//           this.toaster.success(res.message);
//         } else {
//           this.toaster.error(res.message);
//         }
//       })
//     )}
  
    getFormDataById(): void {
      
      this.formDataSubscription.add(
        this.adminService.getFormByID(this.formID).subscribe((res: any) => {
          if (res.status == 200) {
            this.formData = res.userRole[0].column_value;
            this.fmmid = res.userRole[0].fmmd_id;
            console.table(this.formData);
            this.dataSource = new MatTableDataSource(this.formData);
            this.dataSource.paginator = this.paginator;
            this.toaster.success(res.message);
          } else {
            this.toaster.error(res.message);
          }
        })
      )}
  addFieldModel(id:any): void {
    
    this.route.navigate(['/role-master/create',id]);
    
  //   var data={
  //      "rolName":this.formID,
  //      "name":item,
  //    }
  //    this.addFormFieldDialog = this.matDialog.open(AddFormFieldComponent, { data, disableClose: true });
  //    this.addFormFieldDialog.afterClosed().subscribe((res: any) => {
  //      if(res) {
  //        this.getFormDataById(this.formID);
  //      }
  //    });
  //  }
  //  updateFieldModel(data: any): void {
  //   this.updateFormFieldDialog = this.matDialog.open(UpdateFormFieldComponent, { data: data, disableClose: true });
  //   this.updateFormFieldDialog.afterClosed().subscribe((res: any) => {
  //     if(res) {
  //       this.getFormDataById(this.formID);
  //     }
  //   });
  }

  // getFormData(): void {
  //   
  //   this.formListSubscription.add(
  //     this.adminService.getFormList().subscribe((res: any) => {
  //       if (res.status == 200) {
  //         this.formData = res.rows;
  //         this.dataSource = new MatTableDataSource(this.formData);
  //         this.dataSource.paginator = this.paginator;
  //         this.toaster.success(res.message);
  //       } else {
  //         this.toaster.error(res.message);
  //       }
  //     }, (error: any) => {
  //       this.toaster.error(`${error.status} ${error.statusText}`);
  //     })
  //   );
  // }
  OpenUpdate(id:any,data:any){
    
    data.fmmd_id=this.fmmid;
    this.router.navigate(['/role-master/update',id]);
   
    this.adminService.setData(data);
  }
  addFormModel(): void {
    console.log("object")
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
