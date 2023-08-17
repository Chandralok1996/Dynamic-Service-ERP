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
  astdid: any;
  updatebtn:boolean=false;
  constructor(private toaster: ToasterService, private adminService: AdminService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) 
  {
    this.dynamicForm = this.formBuilder.group({});
    if(!this.userCreated) {
      this.userCreated = [];
    } else { this.userCreated = JSON.parse(this.userCreated);}
  }
  ngOnInit(): void {
    var paramData = this.route.snapshot.params;
    this.astdid=paramData['id']
    this.getFormDataById(this.formID);
  }

  getFormDataById(id: number): void {
    this.promisedata=new Promise<any>((resolve,reject)=>{
      this.formDataSubscription.add(
        this.adminService.getFormByID(id).subscribe((res: any) => {
          if (res.status == 200) {
            this.formFields = res.rows;
              this.formfieldname=this.formFields
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
          } else {
          }
        }, (error: any) => {
          this.toaster.error(`${error.status} ${error.statusText}`);
        })
      );
      resolve("done")
    })
        this.promisedata.then((res: any)=>{
          this.itemlist()
        })
  }
  //Item details or Item list
  itemlist()
  {
      var patchpromise=new Promise<any>((resolve,reject)=>{
        this.adminService.getItemdetails(this.astdid).subscribe((res:any)=>{
          this.itemlistdata=res.result
        console.log(this.itemlistdata);
          console.log("starting patch promise");
          resolve("patching")

        })

      })
      patchpromise.then((res:any)=>{this.pachformdata()})
  }

  pachformdata()
  {
    console.log(this.itemlistdata);
    for(var i=0;i<this.itemlistdata.length;i++)
    {
      this.dynamicForm.patchValue(this.itemlistdata[i])
    }
  }

  submitForm() {
    this.updatebtn=true
    var match: any = this.dynamicForm.value, error: any = [];
    this.userCreated.push(match);
    console.log(match);
    match.astd_id=this.astdid;
    this.adminService.updateItem(match).subscribe((res:any)=>{
      console.log(res);
      if(res.status==200)
      {
        this.toaster.success(res.message);
        this.router.navigate(['/item-master']);
      }
      else
      {
        this.toaster.error("Something went wrong");
        this.updatebtn=false;
      }
    },)
    // localStorage.setItem('user-created', JSON.stringify(this.userCreated));
  }
  ngOnDestroy(): void {
    this.formDataSubscription.unsubscribe();
  }
}
