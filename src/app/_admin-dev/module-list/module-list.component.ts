import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AdminService, AppService, ToasterService } from 'src/app/_services';


@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent {
  showPass: boolean = true;
  form: any;
  modulelist: any[] = [];
  paramData:any;
  private subscription: Subscription = new Subscription();

  constructor(private toaster: ToasterService,private route:ActivatedRoute, private service: AppService,private adminService: AdminService,public router: Router) {
  }

  ngOnInit(): void {
    
    this.paramData = this.route.snapshot.params;
    this.form = new FormGroup({
      module_name: new FormControl('', [Validators.required])
    });
    this. getFormList();
  }

  get formCtrl() {
    return this.form.controls;
  }
  getFormList(){
    
    this.adminService.getFormList().subscribe((res: any) => {
          if (res.status) {
           this.modulelist=res.rows;
         
          } else {
            this.toaster.error(res.message);
          }
        }
      )
  }

  submit(): void {
    
    if(!this.form.valid) {
      return;
    }
    let match = {
      'fmls_id':this.form.value.module_name,
      'org_id':this.paramData.id
    }
    this.adminService.setData(match);
    console.log(match);
    this.router.navigate(['/home',match.org_id]);
   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
