import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: any;
  newPassword: any;
  confirmPassword: any;

  constructor(private http: HttpClient) { }

  submitForm() {
    if (this.newPassword !== this.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    const resetData = {
      email: this.email,
      password: this.newPassword
    };

    this.http.post('your-api-url/reset-password', resetData).subscribe(
      (response) => {
        console.log('Password reset successful');
        
        // [routerLink]="['user-master']"
      },
      (error) => {
        console.log('An error occurred while resetting the password');
      }
    );
  }
}
