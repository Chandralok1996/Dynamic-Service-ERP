import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService, ToasterService } from 'src/app/_services';
import { AddFormFieldComponent } from './add-column.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent {
  formID: any;
  dataSource: any;
  formData: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['sr', 'column_label', 'column_type', 'action'];
  addFormFieldDialog!: MatDialogRef<AddFormFieldComponent>;
  private formDataSubscription: Subscription = new Subscription();

  constructor( private matDialog: MatDialog,  private adminService: AdminService,  private toaster: ToasterService, private route: ActivatedRoute) {
    this.formID = this.route.snapshot.paramMap.get('id');
    this.getFormDataById(this.formID);
  }

  ngOnInit(): void {
  }

  getFormDataById(id: number): void {
    this.formDataSubscription.add(
      this.adminService.getFormByID(id).subscribe((res: any) => {
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

  addFieldModel(): void {
    this.addFormFieldDialog = this.matDialog.open(AddFormFieldComponent, { data: this.formID, disableClose: true });
    this.addFormFieldDialog.afterClosed().subscribe((res: any) => {
      if(res) {
        this.formData.push(res);
        let match = { "fmls_id": this.formID, "type": "addcolumn", "columnDetail": [
          { "column_label": res.column_label, "column_type": res.column_type }
        ]};
        this.dataSource = new MatTableDataSource(this.formData);
        this.adminService.addColumnInForm(match).subscribe((res: any) => {
          if(res.status == 201) {
            this.getFormDataById(this.formID);
            this.toaster.success(res.message);
          } else {
            this.toaster.warning(res.message);
          }
        }, (error: any) => {
          this.toaster.error(`${error.status} ${error.statusText}`);
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}