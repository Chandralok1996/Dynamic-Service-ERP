import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './_services';
import { OnInit } from '@angular/core';
import { AdminService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ServicesERP';
  name = 'Angular';
  login: any;
  constructor(public router: Router, private service: AppService,
    private adminservice:AdminService,

) {}

  ngOnInit()
  {
    
      this.login=localStorage.getItem('user')
      console.log(this.login);
  if(this.login==null)
      {
       // this.service.logout()
      }
 this.adminservice.userlist().subscribe((res:any)=>{
      console.log(res);
      
    },
    (error:any)=>{
      console.log(error.error.message);
      if(error.error.message==="Token is not provided")
      {
        this.service.logout()
      }
      
    }
    )
      
  }
}
