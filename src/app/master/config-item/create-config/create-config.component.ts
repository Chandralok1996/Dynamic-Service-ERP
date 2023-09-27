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
  enviorment: any;
  sla_res: any;
  cls: any;
  showform: boolean=false;
  itemlistdata: any;

  constructor(private toaster: ToasterService, private adminService: AdminService, private router: Router, private formBuilder: FormBuilder) {
    this.getFormDataById(this.formID);
    if(!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
  }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      astd_id:this.formBuilder.control(null,Validators.required)
    });
this.showform=true;
this.itemlist()
  }
  getFormDataById(id: number): void {
    this.formDataSubscription.add(
      this.adminService.getFormByID(id).subscribe((res: any) => {
        if (res.status == 200) {
          this.formFields = res.rows;
          console.log(this.formFields);
          this.formFields=this.formFields.filter((item:any)=>{
            return item.column_name=="environment" || item.column_name=="class"  || item.column_name=="sla_response"
            || item.column_name=="ciname"
          })
          console.log(this.formFields);
          
          this.enviorment=this.formFields.filter((item:any)=>{
            return item.column_name=="environment"
          })
          console.log(this.enviorment);
          
          this.cls=this.formFields.filter((item:any)=>{
            return item.column_name=="class"
          })
          console.log(this.cls);

          this.sla_res=this.formFields.filter((item:any)=>{
            return item.column_name=="sla_response"
          })
          console.log(this.sla_res);
          this.createform()

        } else {
          this.toaster.error(res.message);
        }
      }, (error: any) => {
        this.toaster.error(`${error.status} ${error.statusText}`);
      })
    );
  }
  itemlist()
  {
    this.adminService.itemList().subscribe((res:any)=>
    {
      console.log(res);
      this.itemlistdata=res.result
      
    })
  }
createform()
{
  this.formFields.forEach((element:any) => {
    console.log(element.column_label);
    if(element.mandatory)
    {
      this.dynamicForm.addControl(`${element.column_label}`,this.formBuilder.control(null,Validators.required))
    }
    else
    {
      this.dynamicForm.addControl(`${element.column_label}`,this.formBuilder.control(null))

    }
    
  });
}
  submitForm() {
    var match: any = this.dynamicForm.value, error: any = [];
    console.log(match);
    
    // this.formFields.forEach((element: any) => {
    //   if(element.mandatory) {
    //     if(!match[element.column_label]) {
    //       error.push(`${element.column_label}`);
    //     }
    //   }
    // });
    // console.log(error)
    // if(error.length > 0) {
    //   this.toaster.warning(`${error} is required!`);
    //   return;
    // }
    // this.userCreated.push(match);
    // console.log(match);
    this.adminService.configCreate(match).subscribe((res:any)=>{
      console.log(res);
      
      if(res.status==201)
      {
        this.toaster.success(res.message);
        // this.router.navigate(["/item-master"]);
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
