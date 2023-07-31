import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService, AdminService } from 'src/app/_services';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  formID: number = 50001;
  formFields: any;
  dynamicForm!: FormGroup;
  userCreated: any = localStorage.getItem('user-created');
  private formDataSubscription: Subscription = new Subscription();
  incr: any = 0;
  promisedata: any;
  formfieldname: any;
  userlistdata: any;
  userid: any;

  constructor(private toaster: ToasterService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,

    private formBuilder: FormBuilder) {
    this.dynamicForm = this.formBuilder.group({});
    if (!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
  }

  ngOnInit(): void {
    var paramData = this.route.snapshot.params;
    console.log(paramData);
    this.userid = paramData['id']
    console.log(this.userid);
    this.getFormDataById(this.formID);
  }

  getFormDataById(id: number): void {
    this.promisedata = new Promise<any>((resolve, reject) => {
      console.log("starting...");

      this.formDataSubscription.add(
        this.adminService.getFormByID(id).subscribe((res: any) => {
          if (res.status == 200) {
            this.formFields = res.rows;
            console.log(this.formFields);
            this.formfieldname = this.formFields
            this.formFields = this.formFields.sort((a: any, b: any) => {
              return a.position - b.position;
            });
            this.formFields.forEach((value: any) => {
              if (value.mandatory) {
                this.dynamicForm.addControl(`${value.column_label}`, this.formBuilder.control(null, Validators.required));
              } else {
                this.dynamicForm.addControl(`${value.column_label}`, this.formBuilder.control(null));
              }
            });
            // this.toaster.success(res.message);
          } else {
            // this.toaster.error(res.message);
          }
        }, (error: any) => {
          this.toaster.error(`${error.status} ${error.statusText}`);
        })
      );
      resolve("done")
    })

    this.promisedata.then((res: any) => {
      console.log(res);
      this.userlist()
    })
  }

  //user details or user list
  userlist() {
    var patchpromise = new Promise<any>((resolve, reject) => {
      this.adminService.getuserdetails(this.userid).subscribe((res: any) => {
        this.userlistdata = res.result
        console.log(this.userlistdata);
        console.log("starting patch promise");
        resolve("patching")
      })
    })

    patchpromise.then((res: any) => {
      console.log("checking");
      this.pachformdata()
    })
  }

  pachformdata() {
    this.userlistdata[0].Department = 1000
    this.dynamicForm.patchValue(this.userlistdata[0])
    console.log(this.dynamicForm);
  }

  submitForm() {
    var match: any = this.dynamicForm.value, error: any = [];
    this.formFields.forEach((element: any) => {
      if (element.mandatory) {
        if (!match[element.column_label]) {
          error.push(`${element.column_label}`);
        }
      }
    });
    console.log(error)
    if (error.length > 0) {
      this.toaster.warning(`${error} is required!`);
      return;
    }
    this.userCreated.push(match);
    console.log(match);
    this.toaster.warning("Please Integrate api")
    // this.adminService.installationcreate(match).subscribe((res:any)=>{
    // })
    // localStorage.setItem('user-created', JSON.stringify(this.userCreated));
    // this.router.navigate(['/user-master']);
    // var data = { fmls_id: this.id, value: match };
    // this.service.insertRecord(data).subscribe((res: any) => {
    //   if(res.status) {
    //     this.toaster.success(res.message);
    //     this.ngOnInit();
    //   } else {
    //     this.toaster.warning(res.message);
    //   }
    // }, (error: any) => {
    //    this.toaster.error(`${error.status} ${error.statusText}`);
    // });
  }

  ngOnDestroy(): void {
    this.formDataSubscription.unsubscribe();
  }
}
