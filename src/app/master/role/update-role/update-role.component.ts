import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { AdminService, AppService, ToasterService } from "src/app/_services";
import { AddFormFieldComponent } from "src/app/_admin-dev/form-master/view-form/add-column.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UpdateFormFieldComponent } from "src/app/_admin-dev/form-master/view-form/update-column.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-update-role",
  templateUrl: "./update-role.component.html",
  styleUrls: ["./update-role.component.css"],
})
export class UpdateRoleComponent {
  //   updateFormFieldDialog!: MatDialogRef<UpdateFormFieldComponent>;
  //   addFormFieldDialog!: MatDialogRef<AddFormFieldComponent>;
  //   private formDataSubscription: Subscription = new Subscription();
  //   formID: any;
  //   formData: any;
  //   dataSource: any;
  //   pagination: any;
  //   @ViewChild(MatPaginator) paginator!: MatPaginator;
  //   displayedColumns: string[] = ['Sr', 'Module', 'Link', 'Create', 'Update','Delete', 'action'];

  //   private formListSubscription: Subscription = new Subscription();
  //   constructor(private matDialog: MatDialog, private adminService: AdminService, private toaster: ToasterService, private service: AppService) {
  //     this.pagination = this.service.pagination;
  //     this.getFormData();
  //   }

  //   ngOnInit(): void { }

  // getFormDataById(id: number): void {
  //     this.formDataSubscription.add(
  //       this.adminService.getFormByID(id).subscribe((res: any) => {
  //         if (res.status == 200) {
  //           this.formData = res.rows;
  //           console.table(this.formData);
  //           this.dataSource = new MatTableDataSource(this.formData);
  //           this.dataSource.paginator = this.paginator;
  //           this.toaster.success(res.message);
  //         } else {
  //           this.toaster.error(res.message);
  //         }
  //       }, (error: any) => {
  //         this.toaster.error(`${error.status} ${error.statusText}`);
  //       })
  //     );
  //   }

  //   addFieldModel(item:any): void {
  //     var data={
  //        "rolName":this.formID,
  //        "name":item,
  //      }
  //      this.addFormFieldDialog = this.matDialog.open(AddFormFieldComponent, { data, disableClose: true });
  //      this.addFormFieldDialog.afterClosed().subscribe((res: any) => {
  //        if(res) {
  //          this.getFormDataById(this.formID);
  //        }
  //      });
  //    }
  //    updateFieldModel(data: any): void {
  //     this.updateFormFieldDialog = this.matDialog.open(UpdateFormFieldComponent, { data: data, disableClose: true });
  //     this.updateFormFieldDialog.afterClosed().subscribe((res: any) => {
  //       if(res) {
  //         this.getFormDataById(this.formID);
  //       }
  //     });
  //   }

  //   getFormData(): void {
  //     this.formListSubscription.add(
  //       this.adminService.getFormList().subscribe((res: any) => {
  //         if (res.status == 200) {
  //           this.formData = res.rows;
  //           this.dataSource = new MatTableDataSource(this.formData);
  //           this.dataSource.paginator = this.paginator;
  //           this.toaster.success(res.message);
  //         } else {
  //           this.toaster.error(res.message);
  //         }
  //       }, (error: any) => {
  //         this.toaster.error(`${error.status} ${error.statusText}`);
  //       })
  //     );
  //   }

  //   addFormModel(): void {
  //     console.log("object")
  //   }

  //   applyFilter(event: Event) {
  //     const filterValue = (event.target as HTMLInputElement).value;
  //     this.dataSource.filter = filterValue.trim().toLowerCase();
  //     if (this.dataSource.paginator) {
  //       this.dataSource.paginator.firstPage();
  //     }
  //   }

  //   ngOnDestroy(): void {
  //     this.formListSubscription.unsubscribe();
  //   }
  submitted = false;
  form: any;
  fmmd_id: any;
  roleData: any;
  message: any;
  roleName: any;
  constructor(
    public toaster: ToasterService,
    private admin: AdminService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleData = this.admin.getData();
    this.roleName=this.roleData.value;
    this.form = new FormGroup({
      column_value: new FormControl("", Validators.required),
      //  description: new FormControl('')
    });
  }

  get f() {
    return this.form.controls;
  }
  onSubmit(): void {
    ;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.roleData = {
      id: this.roleData.id,
      fmmd_id: this.roleData.fmmd_id,
      column_value: this.form.value.column_value,
    };
    this.admin.updateMasterData(this.roleData).subscribe((res: any) => {
      if (res.status == 200) {
        this.form.reset();
        this.message = "Role updated successfully";
        this.toaster.success(this.message);
        this.router.navigate(["/role-master"]);
      } else {
        this.toaster.error("Error");
      }
    });
  }
}
