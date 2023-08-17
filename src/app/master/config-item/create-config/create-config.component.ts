import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService, AdminService } from 'src/app/_services';

@Component({
  selector: 'app-create-config',
  templateUrl: './create-config.component.html',
  styleUrls: ['./create-config.component.css']
})
export class CreateConfigComponent {
  formID: number = 50002;
  formFields: any;
  dynamicForm!: FormGroup;
  userCreated: any = localStorage.getItem('user-created');
  private formDataSubscription: Subscription = new Subscription();
  incr: any=0;
  subformdata:any=[];
  nosubform: any=[];

  constructor(private toaster: ToasterService, private adminService: AdminService, private router: Router, private formBuilder: FormBuilder) {
    this.getFormDataById(this.formID);
    this.dynamicForm = this.formBuilder.group({});
    if(!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
  }

  ngOnInit(): void {
  }
  getFormDataById(id: number): void {
    this.formDataSubscription.add(
      this.adminService.getFormByID(id).subscribe((res: any) => {
        if (res.status == 200) {
          this.formFields = res.rows;
          this.nosubform=res.rows
          this.nosubform=this.nosubform.filter((item:any)=>{
            return item.type!="subform"
          })
          console.log(this.formFields);
          this.subformdata=res.rows
          this.subformdata=this.subformdata.filter((item:any)=>{
            return item.type=="subform"
          })
          this.formFields = this.formFields.sort((a: any, b: any) => {
            return a.position - b.position;
          });
          this.formFields.forEach((value: any) => {
            if(value.mandatory) {
              this.dynamicForm.addControl(`${value.column_label}`, this.formBuilder.control(null, Validators.required));
            } else {
              this.dynamicForm.addControl(`${value.column_label}`, this.formBuilder.control(null));
            }
          });
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
    var match: any = this.dynamicForm.value, error: any = [];
    this.formFields.forEach((element: any) => {
      if(element.mandatory) {
        if(!match[element.column_label]) {
          error.push(`${element.column_label}`);
        }
      }
    });
    console.log(error)
    if(error.length > 0) {
      this.toaster.warning(`${error} is required!`);
      return;
    }
    this.userCreated.push(match);
    console.log(match);
    this.adminService.itemCreate(match).subscribe((res:any)=>{
      if(res.status==201)
      {
        this.toaster.success(res.message);
        this.router.navigate(["/item-master"]);
      }
      else
      {
        this.toaster.error("Something went wrong");
      }
    },)
    // localStorage.setItem('user-created', JSON.stringify(this.userCreated));
  }
  ngOnDestroy(): void {
    this.formDataSubscription.unsubscribe();
  }
}
