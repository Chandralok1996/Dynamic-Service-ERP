import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService, AppService, ToasterService } from 'src/app/_services';
import { AddFormFieldComponent } from './add-column.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UpdateFormFieldComponent } from './update-column.component';
import { PreviewComponent } from '../preview/preview.component';
@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent {
  formID: any;
  dataSource: any;
  formData: any = [];
  pagination: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['sr', 'column_label', 'column_type', 'action'];
  addFormFieldDialog!: MatDialogRef<AddFormFieldComponent>;
  updateFormFieldDialog!: MatDialogRef<UpdateFormFieldComponent>;
  previewformdialog!:MatDialogRef<PreviewComponent>
  private formDataSubscription: Subscription = new Subscription();

  constructor( private matDialog: MatDialog,  private adminService: AdminService, private service: AppService,  private toaster: ToasterService, private route: ActivatedRoute) {
    this.formID = this.route.snapshot.paramMap.get('id');
    this.pagination = this.service.pagination;
    this.getFormDataById(this.formID);
  }

  ngOnInit(): void {
  }

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

  addFieldModel(item:any): void {
   var data={
      "formid":this.formID,
      "form_type":item,
    }
    this.addFormFieldDialog = this.matDialog.open(AddFormFieldComponent, { data, disableClose: true });
    this.addFormFieldDialog.afterClosed().subscribe((res: any) => {
      if(res) {
        this.getFormDataById(this.formID);
      }
    });
  }

  updateFieldModel(data: any): void {
    this.updateFormFieldDialog = this.matDialog.open(UpdateFormFieldComponent, { data: data, disableClose: true });
    this.updateFormFieldDialog.afterClosed().subscribe((res: any) => {
      if(res) {
        this.getFormDataById(this.formID);
      }
    });
  }
  previewmodel():void
  {
  this.previewformdialog=  this.matDialog.open(PreviewComponent)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}