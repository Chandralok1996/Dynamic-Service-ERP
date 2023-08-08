
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService, ToasterService } from 'src/app/_services';
@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(public toaster: ToasterService, private admin : AdminService) { }

  ngOnInit(): void { }

 
  onSubmit(): void {
    this.admin.createRole(this.form.value).subscribe((res: any) => {
      if (res.status) {
        this.form.reset();
        this.toaster.success('Success',);
      } else {
        this.toaster.error('Error',);
      }
    });
  }
}
