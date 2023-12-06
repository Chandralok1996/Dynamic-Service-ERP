import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdminService, AppService, ToasterService } from 'src/app/_services';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-master',
  templateUrl: './form-master.component.html',
  styleUrls: ['./form-master.component.css']
})

export class FormMasterComponent {
  formData: any;
  dataSource: any;
  form_name: string | null;

  pagination: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['sr', 'form_name', 'description', 'active_status', 'created_at', 'action'];

  private formListSubscription: Subscription = new Subscription();

  constructor(private adminService: AdminService, 
    private toaster: ToasterService, private service: AppService,
    private router:Router,
private route:ActivatedRoute
) {
    this.pagination = this.service.pagination;
    this.getFormData();
    this.form_name = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit(): void { }

  getFormData(): void {
    this.formListSubscription.add(
      this.adminService.getFormList().subscribe((res: any) => {
        if (res.status == 200) {
          this.formData = res.rows;
 if(this.form_name=='User_Management')
          {
            this.formData=this.formData.filter((item:any)=>{
              return item.form_name=="User Management"
            })
          }else if(this.form_name=='Assets_Management')
          {
            this.formData=this.formData.filter((item:any)=>{
              return item.form_name=="Assets Management"
            })
          }
          else if(this.form_name=='Configuration_Item')
          {
            this.formData=this.formData.filter((item:any)=>{
              return item.form_name=="Configuration Item"
            })
          }
          else if(this.form_name=='Incident')
          {
            this.formData=this.formData.filter((item:any)=>{
              return item.form_name=="Incident"

            })
            
          }
          else{
            this.router.navigate(['/home'])
          }
          this.dataSource = new MatTableDataSource(this.formData);
          this.dataSource.paginator = this.paginator;
         
        } 
        else {
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
