import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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
  role: any;
  user: any;
  isDeveloper: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '');
    this.rolename = this.user.roleName;
    this.isDeveloper = this.rolename == 'developer';
  }

  roleSelection() {
    this.isDeveloper = !this.isDeveloper;
  }

  routeuser() {
    if (this.rolename == "developer") {
      this.router.navigate(['/admin/form-master']);
    } else {
      this.router.navigate(['/user-master'])
    }
  }
}