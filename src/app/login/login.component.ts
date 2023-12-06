import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService, ToasterService } from '../_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPass: boolean = true;
  form: any;
  private subscription: Subscription = new Subscription();

  constructor(private toaster: ToasterService, private service: AppService, public router: Router) {
 this.service.user.subscribe((res: any) => {
      const response = JSON.parse(res);
      if(response?.roleName) {
        if(response.roleName == 'developer') {
         // this.router.navigate(['/admin/organization']);
         this.router.navigate(['/home']);
        } else if(response.roleName=='enduser') {
          console.log(response)
          this.router.navigate(['/it-sm']);
        }
        else if(response.roleName=='Housekeeping') {
          console.log(response)
          this.router.navigate(['/it-sm']);
        }
        else if(response.roleName == 'Administrator')
        {
          this.router.navigate(['/it-sm/allTickets']);
          //this.router.navigate(['/it-sm/dashboard-card']);
        }
        else if(response.roleName=='HR')
        {
          this.router.navigate(['/it-sm']);
          //this.router.navigate(['/it-sm/dashboard-card']);
        }
        else if(response.roleName=='IT Engineer')
        {
          this.router.navigate(['/it-sm']);
          //this.router.navigate(['/it-sm/dashboard-card']);
        }
        else if(response.roleName=='Accountant')
        {
          this.router.navigate(['/it-sm']);
          //this.router.navigate(['/it-sm/dashboard-card']);
        }
     
        else if(response.roleName=='Procurement')
        {
          this.router.navigate(['/it-sm']);
          //this.router.navigate(['/it-sm/dashboard-card']);
        }
        else if(response.roleName=='Guest')
        {
          this.router.navigate(['/it-sm']);
          //this.router.navigate(['/it-sm/dashboard-card']);
        }
        else if(response.roleName=='Helpdesk')
        {
          this.router.navigate(['/it-sm/dashboard-card']);
          //this.router.navigate(['/it-sm/dashboard-card']);
        }
        else if(response.roleName=='Manager')
        {
          this.router.navigate(['/it-sm/dashboard-card']);
          //this.router.navigate(['/it-sm/dashboard-card']);
        }
        else{
          this.router.navigate(['/home']);

        }
      }
    }, (error: any) => {
      console.log(error);
    }); 
}
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // ngAfterViewInit(): void {
  //   this.service.logout();    
  // }

  get formCtrl() {
    return this.form.controls;
  }

  createForm(): void {
    
    if(!this.form.valid) {
      this.toaster.error("Please enter valid user and password!");
      return;
    }
    let match = this.form.value;
    this.subscription.add(
      this.service.userLogIn(match).subscribe((res: any) => {
        if (res.status) {
          this.toaster.success('User login successful!');
          window.location.reload();
        } else {
          this.toaster.error(res.message);
        }
      }, (error: any) => {
        this.toaster.error('Please enter a valid username and password!' + error);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
