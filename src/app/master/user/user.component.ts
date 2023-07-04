import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService, AppService, AdminService } from 'src/app/_services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  formID: number = 50001;
  private formDataSubscription: Subscription = new Subscription();
  formFields: any;

  constructor(private toaster: ToasterService, private route: ActivatedRoute, private service: AppService, private adminService: AdminService) {
    this.getFormDataById(this.formID);
  }

  ngOnInit(): void {}

  getFormDataById(id: number): void {
    this.formDataSubscription.add(
      this.adminService.getFormByID(id).subscribe((res: any) => {
        if (res.status == 200) {
          this.formFields = res.rows;
          console.table(this.formFields);
          this.toaster.success(res.message);
        } else {
          this.toaster.error(res.message);
        }
      }, (error: any) => {
        this.toaster.error(`${error.status} ${error.statusText}`);
      })
    );
  }

  submitForm() {
    var match: any = { }, error: any = [];
    this.formFields.forEach((element: any) => {
      match[element.name] = (<HTMLInputElement>document.getElementById(element.name)).value ? (<HTMLInputElement>document.getElementById(element.name)).value : null;
      if(element.isRequired) {
        if(!(<HTMLInputElement>document.getElementById(element.name)).value) {
          error.push(`${element.label} is required!`);
        }
      }
    });
    console.log(error)
    if(error.length > 0) {
      this.toaster.warning("Please fill complete form!");
      return;
    }
    console.log(match);
    // var data = { fmls_id: this.id, value: match };
    // this.service.insertRecord(data).subscribe((res: any) => {
    //   if(res.status) {
    //     this.toaster.success(res.message);
    //     this.ngOnInit();
    //   } else {
    //     this.toaster.warning(res.message);
    //   }
    // }),
  }

}
