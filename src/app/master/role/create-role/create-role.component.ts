
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService, ToasterService } from 'src/app/_services';
@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {
  submitted = false;
  form:any;
  fmmd_id:any;
  roleData:any;
  message:any;
  constructor(public toaster: ToasterService, private admin : AdminService,public route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.fmmd_id = params.get('id');
    });
    this.form = new FormGroup({
      column_value: new FormControl('',Validators.required),
    //  description: new FormControl('')
    });
  
   }

  get f() {
    return this.form.controls;
  }
  onSubmit(): void {
    
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.roleData = {
      "fmmd_id":this.fmmd_id,
    "column_value":this.form.value.column_value
    }
    this.admin.createMasterData(this.roleData).subscribe((res: any) => {
      if (res.status == 200) {
        this.form.reset();
        this.message = "Role created successfully";
        this.toaster.success(this.message);
        this.router.navigate(["/role-master"]);
      } else {
        this.toaster.error('Error',);
      }
    });
  }
}
