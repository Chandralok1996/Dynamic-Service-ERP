import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService, AdminService } from 'src/app/_services';

@Component({
  selector: 'app-update-config',
  templateUrl: './update-config.component.html',
  styleUrls: ['./update-config.component.css']
})
export class UpdateConfigComponent {
  formID: number = 50002;

  formFields: any;
  dynamicForm!: FormGroup;
  userCreated: any = localStorage.getItem('user-created');
  private formDataSubscription: Subscription = new Subscription();
  incr: any=0;
  promisedata:any;
  formfieldname: any;
  itemlistdata: any;
  cicd_id: any;
  updatebtn:boolean=false;
  enviorment: any;
  cls: any;
  sla_res: any;
  configformfiled: any;
  itemdata: any;
  constructor(private toaster: ToasterService, private adminService: AdminService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) 
  {
    if(!this.userCreated) {
      this.userCreated = [];
    } else { this.userCreated = JSON.parse(this.userCreated);}
        this.getFormDataById(this.formID);

  }
  ngOnInit(): void {
    var paramData = this.route.snapshot.params;
    this.cicd_id=paramData['id']
    this.dynamicForm = this.formBuilder.group({
      astd_id:this.formBuilder.control(null,Validators.required)
    });
    this.itemlist()
  }
  itemlist()
  {
    this.adminService.itemList().subscribe((res:any)=>
    {
      console.log(res);
      this.itemdata=res.result
      
    })
  }
  getFormDataById(id: number): void {
    this.formDataSubscription.add(
      this.adminService.getFormByID(id).subscribe((res: any) => {
        if (res.status == 200) {
          this.formFields = res.rows;
          console.log(this.formFields);
          this.configformfiled=this.formFields.filter((item:any)=>{
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
  createform()
{

  this.configformfiled.forEach((element:any) => {
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
  this.configdetails()
}
  configdetails()
  {

        this.adminService.getconfigdetails(this.cicd_id).subscribe((res:any)=>{
          this.itemlistdata=res.result
        console.log(this.itemlistdata);

          this.pachformdata()
        })

      
  }

  pachformdata()
  {
    
   this.dynamicForm.patchValue(this.itemlistdata[0])
  }

  submitForm() {
  
    // localStorage.setItem('user-created', JSON.stringify(this.userCreated));
  }
  ngOnDestroy(): void {
    this.formDataSubscription.unsubscribe();
  }
}
