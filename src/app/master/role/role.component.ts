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
  formID: any;
  formData: any;
  dataSource: any;
  pagination: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['sr', 'roleID', 'roleName', 'roleDetails', 'action'];

  private formListSubscription: Subscription = new Subscription();
  constructor(private matDialog: MatDialog, private adminService: AdminService, 
    private toaster: ToasterService, private service: AppService, private route : Router) {
    this.pagination = this.service.pagination;
    this.getFormData();
  }

  ngOnInit(): void { }

getFormDataById(id: number): void {
    this.formDataSubscription.add(
      this.adminService.getFormByID(id).subscribe((res: any) => {
        if (res.status == 200) {
          this.formData = res.rows;
          console.table(this.formData);
          this.dataSource = new MatTableDataSource(this.formData);
          this.dataSource.paginator = this.paginator;
          this.toaster.success(res.message);
        } else {
          this.toaster.error(res.message);
        }
      }, (error: any) => {
        this.toaster.error(`${error.status} ${error.statusText}`);
      })
    );
  }

  addFieldModel(): void {
    this.route.navigate(['/role-master/create']);
    
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

  getFormData(): void {
    this.formListSubscription.add(
      this.adminService.getFormList().subscribe((res: any) => {
        if (res.status == 200) {
          this.formData = res.rows;
          this.dataSource = new MatTableDataSource(this.formData);
          this.dataSource.paginator = this.paginator;
          this.toaster.success(res.message);
        } else {
          this.toaster.error(res.message);
        }
      }, (error: any) => {
        this.toaster.error(`${error.status} ${error.statusText}`);
      })
    );
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

  ngOnDestroy(): void {
    this.formListSubscription.unsubscribe();
  }
}
