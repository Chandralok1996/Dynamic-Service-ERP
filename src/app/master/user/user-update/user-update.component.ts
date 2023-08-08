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
  incr: any=0;
  promisedata:any;
  userlistdata: any;
  userid: any;
  nosubform: any=[];
  subformdata: any=[];
  selectedData:any
  assign: any;
  dataform:any
  updatebtn:boolean=false;
  constructor(private toaster: ToasterService, 
    private adminService: AdminService, 
    private router: Router,
    private route: ActivatedRoute,

     private formBuilder: FormBuilder) {
    this.dynamicForm = this.formBuilder.group({});
    if(!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
  }

  ngOnInit(): void {
    var paramData = this.route.snapshot.params;
console.log(paramData);
this.userid=paramData['id']
console.log(this.userid);

    this.getFormDataById(this.formID);

  }

  getFormDataById(id: number): void {
    this.promisedata=new Promise<any>((resolve,reject)=>{
      console.log("starting...");
      
      this.formDataSubscription.add(
        this.adminService.getFormByID(id).subscribe((res: any) => {
       
          if (res.status == 200) {
            this.formFields = res.rows;
            console.log(this.formFields);
            this.nosubform=res.rows
            console.log(this.nosubform);
            
          this.nosubform=this.nosubform.filter((item:any)=>{
            return item.type!="subform"
          })
          this.nosubform=this.nosubform.filter((item:any)=>{
            return item.type!="password"
          })
          var assign=this.nosubform.filter((item:any)=>{
            return item.type=="assigndropdown"
          })
          console.log(assign);
          this.assign=assign
          
          console.log(this.formFields);
          this.subformdata=res.rows
          this.subformdata=this.subformdata.filter((item:any)=>{
            return item.type=="subform"
          })
            this.formFields = this.formFields.sort((a: any, b: any) => {
              return a.position - b.position;
            });
            
            this.formFields.forEach((value: any) => {
              console.log(value);
              
              if(value.mandatory) {
                if(value.type!="password")
                {
                  this.dynamicForm.addControl(`${value.column_label}`, this.formBuilder.control(null, Validators.required));
                }
                if (value.type=="password")
                {

                }
             
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
    

        this.promisedata.then((res: any)=>{
          console.log(res);
          this.userlist()
        })

  }
  patchfun()
  {
 
  }
 
  onItemDeSelect(data:any)
  {
console.log(data);

  }

  //user details or user list
  userlist()
  {
      var patchpromise=new Promise<any>((resolve,reject)=>{
        this.adminService.getuserdetails(this.userid).subscribe((res:any)=>{
          this.userlistdata=res.result
       
          
        console.log(this.userlistdata);
            this.userlistdata.map((res:any)=>{
              console.log(res);
              
            })
            
          console.log("starting patch promise");
          resolve("patching")

        })

      })
       
    
      patchpromise.then((res:any)=>{
        console.log("checking");
              this.pachformdata()  
      })

  }
  pachformdata()
  {
    console.log(this.userlistdata);
// var data=    [
//       {
//           "user_id": "100001",
//           "First Name": "Administrator",
//           "Middle Name": null,
//           "Last Name": null,
//           "Description": "Admin User",
//           "createdtime": "2021-05-02T14:55:09.426Z",
//           "Nick name": null,
//           "Title": null,
//           "table4_id": null,
//           "Secondary Mobile Number": null,
//           "usrl_id": "301",
//           "Login Name": "Administrator",
//           "description": "Administrator",
//           "usdg_id": null,
//           "Designation": "4001",
//           "table2_id": null,
//           "Support Group": [],
//           "table1_id": null,
//           "User Status": null,
//           "table5_id": null,
//           "Address line 1": null,
//           "table6_id": null,
//           "User Teams": null,
//           "uscn_id": "3001",
//           "Email Id": "admin@admin",
//           "landline": "9999988888",
//           "Mobile Number": "8888899999",
//           "web_url": "admin.com",
//           "res_phone": "8888899999",
//           "login_id": "200001",
//           "status": "ACTIVE",
//           "userst": null,
//           "joindt": null,
//           "usercg": null,
//           "Contact info": [],
//           "User Role": [
//           "301","304"   
//           ],
//           "Contact Info": [
//               {
//                   "uscn_id": "3001",
//                   "emailid": "admin@admin",
//                   "landline": "9999988888",
//                   "mobile": "8888899999",
//                   "web_url": "admin.com",
//                   "res_phone": "8888899999",
//                   "user_id": "100001"
//               }
//           ]
//       }
//   ]

    console.log(this.userlistdata[0].UserRole);

    for(var i=0;i<this.userlistdata.length;i++)
    {
      this.dynamicForm.patchValue(this.userlistdata[i])

    }

 
     
     

     
     
  }
  onItemSelect(data:any,event:any)
  {
      console.log(event.value);

      
          
  }

  submitForm() {
    this.updatebtn=true
    var match: any = this.dynamicForm.value, error: any = [];
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
   
    this.userCreated.push(match);

console.log(match);
match.user_id=this.userid
    this.adminService.updateuser(match).subscribe((res:any)=>{
      console.log(res);
      
      if(res.message=="User Updated successfully")
      {
        this.toaster.success(res.message);
        this.router.navigate(['/user-master']);
      }
      else
      {
        this.toaster.success("Something went wrong");
        this.updatebtn=false;
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
