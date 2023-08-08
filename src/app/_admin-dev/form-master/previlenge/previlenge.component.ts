import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdminService, AppService, ToasterService } from 'src/app/_services';

@Component({
  selector: 'app-previlenge',
  templateUrl: './previlenge.component.html',
  styleUrls: ['./previlenge.component.css']
})
export class PrevilengeComponent {
  dataSource: any;
  pagination: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['column_label'];
  formData: any;
  constructor(private adminService: AdminService, private toaster: ToasterService, private service: AppService) {
    this.pagination = this.service.pagination;
    this.getFormDataById(50001);
  }
  getFormDataById(id: number): void {
      this.adminService.getFormByID(id).subscribe((res: any) => {
        if (res.status == 200) {
          this.formData = res.rows;
          console.table(this.formData);

          var role=this.formData.filter((item:any)=>{
            return item.column_label=="User Role"
          })
          console.log(role);
          var column=role[0].column_value
          var arr:any=[], arr1:any = [];
          var getcol=column.forEach((item:any)=>{
            arr.push(item.value)
            //  arr1.push(item.id)
          })
          console.log(arr);
          this.displayedColumns.concat(getcol)
          // this.displayedColumns.push('action')
          this.displayedColumns=this.displayedColumns.concat(arr);
          console.log(this.displayedColumns);
          this.displayedColumns.push('Action')
          
          this.dataSource = new MatTableDataSource(this.formData);
          this.dataSource.paginator = this.paginator;
          this.toaster.success(res.message);
        } else {
          this.toaster.error(res.message);
        }
      }, (error: any) => {
        this.toaster.error(`${error.status} ${error.statusText}`);
      })
    
  }
  getevent(ac:any,data:any,col:any)
  {
    console.log(col.column_label);
    alert(ac+"+"+data+"+"+col.column_label)
    
  }
  savedata(data:any)
  {
    alert(data)
  }
  //readonly checkbox-code
  handleReadonlyCheckbox() {
    const readonlyCheckbox = document.getElementById("readonlyCheckbox") as HTMLInputElement;
    const createCheckbox = document.getElementById("createCheckbox") as HTMLInputElement;
    const updateCheckbox = document.getElementById("updateCheckbox") as HTMLInputElement;

    if (readonlyCheckbox.checked) {
        createCheckbox.disabled = true;
        updateCheckbox.disabled = true;
        console.log(updateCheckbox.disabled=true)
    } else {
        createCheckbox.disabled = false;
        updateCheckbox.disabled = false;
        console.log(updateCheckbox.disabled=false)
    }
}


}
