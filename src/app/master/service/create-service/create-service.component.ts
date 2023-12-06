import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService, AdminService } from 'src/app/_services';
import { AddFieldComponent } from '../../add-field/add-field.component';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent {
  formID: number = 50009;
  formFields: any;
  dynamicForm!: FormGroup;
  userCreated: any = localStorage.getItem('user-created');
  private formDataSubscription: Subscription = new Subscription();
  incr: any=0;
  subformdata:any=[];
  nosubform: any=[];
  enviorment: any;
  sla_res: any;
  cls: any;
  showform: boolean=false;
  url:any;
  itemlistdata: any;
  linkListData:any;
  linkListUserData:any;
  linkListServiceData:any;
  fmls_id:any;
  linkedData:any;

  constructor(private toaster: ToasterService,public dialog: MatDialog, private adminService: AdminService, private router: Router, private formBuilder: FormBuilder) {
    this.getFormDataById(this.formID);
    if(!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
       this.dynamicForm = this.formBuilder.group({
    });
  }

  ngOnInit(): void {
 
this.showform=true;



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
          // this.formFields = this.formFields.sort((a: any, b: any) => {
          //   return a.position - b.position;
          // });
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




addField(item: any) {

  const dialogRef = this.dialog.open(AddFieldComponent, {
    width: '50%',
   // scrollStrategy: new NoopScrollStrategy(),
    disableClose: true,
    data: { data: item }
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    this.getFormDataById(this.formID);
  })
}

  submitForm() {
    
    var match: any = this.dynamicForm.value, error: any = [];
    console.log(match);
    this.adminService.createCIService(match).subscribe((res:any)=>{
      console.log(res);
      
      if(res.status==201)
      {
        this.toaster.success(res.message);
        this.router.navigate(["/ci-master"]);
      }
      else
      {
        this.toaster.error("Something went wrong");
      }
    },
    (error:any)=>{
      this.toaster.error(error.error.message)
    }
    )
    // localStorage.setItem('user-created', JSON.stringify(this.userCreated));
  }
  ngOnDestroy(): void {
  this.formDataSubscription.unsubscribe();
  }
}
