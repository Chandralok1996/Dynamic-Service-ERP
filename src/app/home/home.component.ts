import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Route,Router } from '@angular/router';
import { AdminService, ToasterService, AppService } from '../_services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  template: `  
  <mat-toolbar color="primary" class="toolbar">
    <h1>My favorite work app</h1>
    <div>
      <app-profile></app-profile> 
      <app-menu></app-menu> 
    </div>
  </mat-toolbar>
  <router-outlet></router-outlet> 
`,  
styles: [`  
 .toolbar { display: flex; justify-content: space-between; }
`] 
})
export class HomeComponent implements OnInit {
  rolename: any;
  formData: any;
  subformData: any;
  formmoduleList:any=[];
  formModuleData:any=[];
  formListData:any=[];
  formListData1:any=[];
  showFormModule:boolean = false;
  constructor( private router:Router, private adminService: AdminService, private toaster: ToasterService, private service: AppService)
  {this.getFormData();}
ngOnInit(): void {
  
  var user:any=localStorage.getItem('user')
  console.log(user);
  user=JSON.parse(user)
  console.log(user.roleName)
  this.rolename=user.roleName
this.formmoduleList=this.adminService.getData();
this.formModuleData=this.formmoduleList.module_name;
  
  
}

getFormData(): void {
  
    this.adminService.getFormList().subscribe((res: any) => {
      if (res.status == 200) {
        this.formData = res.rows;
        this.subformData = res.rows[0].subModules;
     console.log( this.subformData);
     this.formData.forEach((element:any) => {
      this.formModuleData.forEach((element1:any) => {
        if(element1 == element.fmls_id)
        {
          this.formListData.push({
            'showFormModule' : true,
            'fmls_id':element1
        })
        
        }
      });
     });
     return this.formListData;
        this.toaster.success(res.message);
      } else {
        this.toaster.error(res.message);
      }
    }, (error: any) => {
      this.toaster.error(`${error.status} ${error.statusText}`);
    })
 
}

addFieldModel(): void {
  this.router.navigate(['/link-form/create']); 
}
addLinkID(){
  
  this.router.navigate(['/link-form']); 
  
}
userOrg(org:any)
{
  this.router.navigate(['/admin/orgPrivilege/',org])
}
rolepre(id:any)
{
  this.router.navigate(['/admin/previlenge/',id])

}
routeuser()
{
    if(this.rolename=="developer")
    {
      this.router.navigate(['/admin/form-master','User_Management']);
    }
    else
    {
      this.router.navigate(['/user-master'])
    }
}
routeItem()
{
    if(this.rolename=="developer")
    {
      this.router.navigate(['/admin/form-master','Assets_Management']);
    }
    else
    {
      this.router.navigate(['/item-master'])
    }
}
routeconfig()
{
  if(this.rolename=="developer")
  {
    this.router.navigate(['/admin/form-master','Configuration_Item']);
  }
  else
  {
    this.router.navigate(['/ci-master'])
  }
}
routeIncident()
{
  if(this.rolename=="developer")
  {
    this.router.navigate(['/admin/form-master','Incident']);
  }
  else
  {
    this.router.navigate(['/it-sm'])
  }
}
}
