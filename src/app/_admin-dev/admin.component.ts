import { Component, OnInit } from '@angular/core';
import { AppService } from '../_services';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  constructor(private app:AppService)
  {

  }
ngOnInit(): void {
  var user:any=localStorage.getItem('user')
  console.log(user);
  user=JSON.parse(user)
  console.log(user);
  if(user.loginName!='developer')
  {
    this.app.logout()
  }
}
}
