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

  constructor(private toaster: ToasterService, private service: AppService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngAfterViewInit(): void {
    this.service.logout();    
  }

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
          const response = res.response;
          if(response.roleName == 'developer') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
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
