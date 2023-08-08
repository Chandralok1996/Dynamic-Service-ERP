import { Component } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService, AdminService } from 'src/app/_services';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  formID: number = 50001;
  formFields: any;
  dynamicForm!: FormGroup;
  userCreated: any = localStorage.getItem('user-created');
  private formDataSubscription: Subscription = new Subscription();
  incr: any=0;
  subformdata:any=[];
  nosubform: any=[];
  pattern:any;
  moblength:any;
  checking: boolean=true;

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
          console.log(this.formFields);
          
          this.nosubform=res.rows
          this.nosubform=this.nosubform.filter((item:any)=>{
            return item.type!="subform"
          })
          console.log(this.formFields);
          this.subformdata=res.rows
          this.subformdata=this.subformdata.filter((item:any)=>{
            return item.type=="subform"
          })
      
          this.subformdata=this.subformdata.map((res:any)=>
          

       
          ({
            ...res,isactive:"",pattern:""
          }
          )
        
          )
          console.log(this.subformdata);
          this.subformdata.forEach((element:any) => {
            if(element.column_label=="Mobile Number")

            {
              element.isactive=10,
              element.pattern=`[a-zA-Z0-9\s]+`

            }
            else
            {
              element.isactive=""
              element.pattern=""

            }
          });
          console.log(this.subformdata);
          
    
          this.formFields = this.formFields.sort((a: any, b: any) => {
            return a.position - b.position;
          });
          this.formFields.forEach((value: any) => {
            if(value.mandatory) {
              if(value.column_label=="Email Id")
              {
                this.dynamicForm.addControl(`${value.column_label}`, 
                this.formBuilder.control(null, 
                  [
                    Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$'),
                  ],
                  
                  ));

              }
               if(value.column_label=="Mobile Number")
              {
                this.dynamicForm.addControl(`${value.column_label}`, this.formBuilder.control(null, 
                  [
                    Validators.required,
                    Validators.pattern('[0-9]{10}')
                ]
                  ));
                this.pattern="[a-zA-Z0-9\s]+"
              }
              else
              {
                this.dynamicForm.addControl(`${value.column_label}`, this.formBuilder.control(null, Validators.required));

              }
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
  OnlyNumbersAllowed(event: any,data:any): boolean {
    console.log(event);
  if(data=="Mobile Number")
  {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) 
    {
      console.log('charCode restricted is ' + charCode);
      this.checking=false
      return this.checking;
    }
    else
    {
      this.checking=true

      return this.checking;

    }

  }
  else
  {
    this.checking=true;
  }
  return this.checking;
  
    
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
    this.adminService.installationcreate(match).subscribe((res:any)=>{
      if(res.message=="User created successfully")
      {
        this.toaster.success(res.message);
        this.router.navigate(['/user-master']);

      }
      else
      {
        this.toaster.success("Something went wrong");

      }
    },
    (error:any)=>{
      console.log();
      
      this.toaster.success(error.error.message);
      
    }
    
    )
    localStorage.setItem('user-created', JSON.stringify(this.userCreated));
    // var data = { fmls_id: this.id, value: match };
    // this.service.insertRecord(data).subscribe((res: any) => {
    //   if(res.status) {
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
