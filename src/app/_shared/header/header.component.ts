import { Component,EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminService, AppService, ToasterService } from 'src/app/_services';
import { MaterialModule } from 'src/app/material.module';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MaterialModule, RouterModule,CommonModule]
})
export class HeaderComponent {
  @Output() SideNavToggle = new EventEmitter();  
  dataSource: any;
  user: any;
  userRole: any;
  currentDateTime: any;
  showHeader:boolean=false;
  private ignoreURL: string = 'createTicket';
  private ignoreURL1:string='IncidentList';
  public ignoreURL2:string='feedback_form';
  url:any;
  approvalListData: any = [];
  notifiLength: any;

  constructor(public router: Router, private service: AppService, private adminService: AdminService,private toaster: ToasterService) {
    
    this.url=window.location.pathname.slice(1);
   
    this.service.user.subscribe((res:any)=>{
      if(res!=null){
        this.user=JSON.parse(res);
        this.userRole = this.user.roleName;  
      }
    else{
      if (this.url.includes(this.ignoreURL))
      {   
        this.router.navigate([this.url]);
      }
      else if(this.url.includes(this.ignoreURL1))
      {
        this.router.navigate([this.url]);
      }
      else if(this.url.includes(this.ignoreURL2))
      {
        this.router.navigate([this.url]);
      }
    }
   
      
    }) 
  }
  ngOnInit() {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000); // Update every 1 second
    
    var a = this.adminService.getapprovalsList().subscribe(
      (res: any) => {
        if(res.status == 200)
        {
          console.log(res);
          this.approvalListData = res.result;
          if(this.approvalListData.length > 0){
            this.notifiLength = 1;
          }
          console.log(a);
  
          var keyarr: any = [];
        }
        else{
          this.toaster.error("Something went wrong,Please contact to your administrator");
        }
      
      })
  }

  private updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString(); // Adjust the date format as needed
  
    
  }

  signOut(): void {
    console.log("sign out");
    this.service.logout();
  }
  openSidenav() {
    this.SideNavToggle.emit();
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
import { CommonModule } from '@angular/common';
