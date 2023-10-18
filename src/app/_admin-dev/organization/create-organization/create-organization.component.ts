import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AdminService, AppService, ToasterService } from 'src/app/_services';


@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css']
})
export class CreateOrganizationComponent {
  showPass: boolean = true;
  form: any;
  submitted = false;
  OrgData:any;
  message:any;
  private subscription: Subscription = new Subscription();

  constructor(private toaster: ToasterService,private adminService: AdminService, private service: AppService, public router: Router) {
    
    // this.service.user.subscribe((res: any) => {
    //   const response = JSON.parse(res);
    //   if(response?.roleName) {
    //     if(response.roleName == 'developer') {
    //       this.router.navigate(['/home']);
    //     } else {
    //       console.log(response)
    //       this.router.navigate(['/home']);
    //     }
    //   }
    // }, (error: any) => {
    //   console.log(error);
    // }); 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      org: new FormControl('', [Validators.required]),
     // password: new FormControl('', [Validators.required])
    });
  }

  // ngAfterViewInit(): void {
  //   this.service.logout();    
  // }

  get formCtrl() {
    return this.form.controls;
  }

  createOrganization(): void {
  
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.OrgData = {
 "org":this.form.value.org
    }
    this.adminService.createOrganization(this.OrgData).subscribe((res: any) => {
      if (res.status == 201) {
        this.form.reset();
        this.router.navigate(["/admin/organization"]);
        this.message = "Organization created successfully";
        this.toaster.success(this.message);
      } else {
        this.toaster.error('Error',);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
