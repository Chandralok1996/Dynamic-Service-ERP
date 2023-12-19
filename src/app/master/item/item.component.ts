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
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
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
  user:any;
  userRole:any;
  x: any=[];
  orgkeys: any;
  linkListData: any;

  constructor(private adminService: AdminService, 
    private toaster: ToasterService, 
    private service: AppService,
    private router:Router
    ) {
      
      this.service.user.subscribe((res:any)=>{
        if(res!=null){
          this.user=JSON.parse(res);
          this.userRole = this.user.roleName;
      
        }
  
     
        
      }) 
    this.pagination = this.service.pagination;
  }
  public hello: any;
  isMenuOpened: boolean = false;

  ngOnInit(): void {
   this.itemlist()
   this.getformfield()
  }
 
  getformfield()
  {
    
  console.log(this.formID);
  this.adminService.getFormByID(this.formID).subscribe((res:any)=>{
  console.log(res);
  this.formlabel=res.rows
  this.formlabel.forEach((element:any) => {
  this.formfield.push(element.column_label)
});
  console.log(this.formfield);
  console.log(this.formfield);
  this.tempvar=this.formfield.map((item:any)=>{

  return {
    "keyName":item,
    "check":true
  }
    
})
  console.log(this.tempvar);
  this.tempvar=this.tempvar.map((res:any)=>{
  if(res.keyName=="astd_id" ||res.keyName=="Asset Name" || res.keyName=="Asset Type" || res.keyName=="Category" || res.keyName=="Vendor Name" || res.keyName=="Status" )
  {
    return {
      "keyName":res.keyName,
      "check":true
    }
  }
  else
  {
    return {
      "keyName":res.keyName,
      "check":false
    }
  }
 
})
// this.copyDisplayColumn=this.tempvar
this.orgkeys=this.tempvar
this.getkeys=this.tempvar.filter((res:any)=>{
  return res.check==true
})
console.log(this.getkeys);
this.x;
for(var i=0;i<this.getkeys.length;i++)
{
      this.x.push(this.getkeys[i].keyName)
}

console.log(this.x);
this.x.push('Action')
this.copyDisplayColumn=this.x;
})
  }
  itemlist()
  {
   var a= this.adminService.itemList().subscribe(
    (res:any)=>{
      console.log(res.status);
      this.itemlistdata=res.result
      console.log(a);
      var keyarr:any=[]
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
  selectlabel(event:any,data:any)
  {
    console.log(this.orgkeys);
    var getorg:any=[]
    for(var i=0;i<this.orgkeys.length;i++)
    {
      getorg.push(this.orgkeys[i].keyName)
    }
    console.log(getorg);
    if(event.checked==true){

      let getindex=getorg.indexOf(data.keyName)
      console.log(getindex);
      this.x.splice(getindex, 0, data.keyName);
      this.displayedColumns=this.x
      console.log(this.displayedColumns);
      let actionind=this.displayedColumns.indexOf('Action')
      console.log(actionind);
      this.displayedColumns.splice(actionind,1)
      console.log(this.displayedColumns);
      this.displayedColumns.push('Action');

    }
    else
    {
      //unchecked
        let getindex=this.x.indexOf(data.keyName)
        console.log(getindex);
        this.x.splice(getindex,1)
        this.displayedColumns=this.x
    }
  
  }

  itemupdate(data:any)
  {
    console.log(data);
    this.router.navigate(['/item-master/update',data]);
    
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
  itemCreateForm(){
    this.router.navigate(['/item-master/create']);
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
