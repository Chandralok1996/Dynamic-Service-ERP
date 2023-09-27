import { Component, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdminService, ToasterService, AppService } from 'src/app/_services';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FormGroup ,FormControl} from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-config-item',
  templateUrl: './config-item.component.html',
  styleUrls: ['./config-item.component.css']
})
export class ConfigItemComponent {
  formData: any;
  dataSource: any;
  userCreated: any = localStorage.getItem('user-created');
  pagination: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: any = [];
  private formListSubscription: Subscription = new Subscription();
  tempvar:any;
  copyDisplayColumn: any;
  temparray:any=[]
  itemlistdata: any;
  formID: any = 50002;
  formlabel: any
  formfield:any=[]
  getkeys: any;
  x: any=[];
  orgkeys: any;
  columnfiled: any=[];

  constructor(private adminService: AdminService, 
    private toaster: ToasterService, 
    private service: AppService,
    private router:Router
    ) {
    this.userCreated = JSON.parse(this.userCreated);
    this.pagination = this.service.pagination;
  }
  public hello: any;
  isMenuOpened: boolean = false;

  ngOnInit(): void {
   this.itemlist()
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
  itemlist()
  {
   var a= this.adminService.getcilist().subscribe(
    (res:any)=>{
      console.log(res);
      
      console.log(res.status);
      this.columnfiled=res.result[0]
      console.log(this.columnfiled);
  
      var emparr:any=[]
      emparr=Object.keys(this.columnfiled)
      console.log(emparr);
      
      emparr.push('Action')
      this.copyDisplayColumn=emparr
      this.itemlistdata=res.result
      this.dataSource = new MatTableDataSource(this.itemlistdata);
      this.dataSource.paginator = this.paginator;

    },
    (error:any)=>{
      console.log(error.error.message);
      if(error.error.message=="Token is not provided")
      {
    
              this.service.logout()
      }
    }
    )
  }


  configupdate(data:any)
  {
    console.log(data);
    this.router.navigate(['/ci-master/update',data]);
    
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

  ngOnDestroy(): void {
    this.formListSubscription.unsubscribe();
  }
}
