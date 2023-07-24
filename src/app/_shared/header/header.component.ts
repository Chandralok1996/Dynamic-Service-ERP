import { Component,EventEmitter, HostListener, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from 'src/app/_services';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule]
})
export class HeaderComponent {
  @Output() SideNavToggle = new EventEmitter();  
  dataSource: any;
  user: any;
  userRole: any;
  currentDateTime: any;
  isMobile: boolean = false;
  @HostListener('window: resize', ['$event'])
  getScreenSize(){
    this.isMobile = window.innerWidth < 705;
  }
 
  constructor(public router: Router, private service: AppService) {
    this.service.user.subscribe((res:any)=>{
      this.user=JSON.parse(res);
      this.userRole = this.user.roleName;
    }) 
    this.getScreenSize();
  }
  ngOnInit() {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000); // Update every 1 second
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
