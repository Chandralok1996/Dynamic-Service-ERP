import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Route,Router } from '@angular/router';
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
  constructor(
    private router:Router

  )
  {
  }
ngOnInit(): void {
  var user:any=localStorage.getItem('user')
  console.log(user);
  user=JSON.parse(user)
  console.log(user.roleName)
  this.rolename=user.roleName
  
}
routeuser()
{
    if(this.rolename=="developer")
    {
      this.router.navigate(['/admin/form-master']);
    }
    else
    {
      this.router.navigate(['/user-master'])
    }
}
}