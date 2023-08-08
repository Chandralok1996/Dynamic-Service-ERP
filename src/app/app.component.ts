import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './_services';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ServicesERP';
  name = 'Angular';
  login: any;
  constructor(public router: Router, private service: AppService) {}
  ngOnInit()
  {
      this.login=localStorage.getItem('user')
      console.log(this.login);
      
  }
}
