import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AdminService, AppService, ToasterService } from 'src/app/_services';


@Component({
  selector: 'app-approval-flow',
  templateUrl: './approval-flow.component.html',
  styleUrls: ['./approval-flow.component.css']
})
export class ApprovalFlowComponent {
  showPass: boolean = true;
  form: any;
  approvalDetails: any[] = [];
  modulelist:any;
  private subscription: Subscription = new Subscription();

  constructor(private toaster: ToasterService,private adminService: AdminService, private service: AppService, public router: Router) {
  }

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   module_name: new FormControl('', [Validators.required]),
    //   name:new FormControl('', [Validators.required]),
    //   condition:new FormControl('', [Validators.required]),
    // });
   this.getApprovalList();
  }

  get formCtrl() {
    return this.form.controls;
  }
  getApprovalList(){
    
    this.adminService.getapprovalListDetails().subscribe((res: any) => {
          if (res.status) {
           this.approvalDetails=res.rows;
         
          } else {
            this.toaster.error(res.message);
          }
        }
      )
  }
  selectForm(): void {
    
    if(!this.form.valid) {
      return;
    }
    let match = this.form.value;
    this.router.navigate(["/admin/SelectModule",this.form.value.name]);
    // this.subscription.add(
    //   this.service.userLogIn(match).subscribe((res: any) => {
    //     if (res.status) {
    //       this.toaster.success('User login successful!');
    //       window.location.reload();
    //     } else {
    //       this.toaster.error(res.message);
    //     }
    //   }, (error: any) => {
    //     this.toaster.error('Please enter a valid username and password!' + error);
    //   }
    // ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  goToCreateApproval(){
    this.router.navigate(['approvalFlow/createApproval']);
  }
}
