import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/_services';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent  implements OnInit {
  @Output() closeSideNav = new EventEmitter();
  buttonName1: any;
  show1: boolean = false;
  buttonName2: any;
  show2: boolean = false;
  buttonName3: any;
  show3: boolean =false;
  open: boolean=false;
  open1: boolean=false;
  open2: boolean=false;
  open3: boolean=false;
  show4: boolean = false;
  buttonName4: any;
  tokenName: any;
  user:any;
  userRole:any
 
  constructor(private appService:AppService, public router:Router) {
    this.appService.user.subscribe((res:any)=>{
      this.user=JSON.parse(res);
      this.userRole = this.user.roleName;
      console.log(this.user.roleName);
      
    }) 

  }


  ngOnInit() {
    this.tokenName =localStorage.getItem("user");
    console.log(this.tokenName);
 this.tokenName =localStorage.getItem("user");
//  var res=this.adminService;
  }
  onToggleClose() {
    this.closeSideNav.emit();
  
}

onToggle(){
  this.show1 = !this.show1;
  if(this.show1)  
    this.buttonName1 = "Hide";
  else
    this.buttonName1 = "Show";
}
onTogg(){
  this.show2 = !this.show2;
  if(this.show2)  
    this.buttonName2 = "Hide";
  else
    this.buttonName2 = "Show";
}
onTog(){
  this.show3 = !this.show3;
  if(this.show3)  
    this.buttonName3 = "Hide";
  else
    this.buttonName3 = "Show";
}
onT(){
  this.show4 = !this.show4;
  if(this.show4)  
    this.buttonName4 = "Hide";
  else
    this.buttonName4 = "Show";
}

openArrow(){
  this.open = !this.open;
  }
openArrow1(){
  this.open1 = !this.open1;
  }
openArrow2(){
  this.open2 = !this.open2;
  }
  openArro(){
  this.open3 = !this.open3;
  }


 
}
