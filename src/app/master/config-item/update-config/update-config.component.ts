import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ToasterService, AdminService } from "src/app/_services";
import { AddFieldComponent } from "../../add-field/add-field.component";

@Component({
  selector: "app-update-config",
  templateUrl: "./update-config.component.html",
  styleUrls: ["./update-config.component.css"],
})
export class UpdateConfigComponent {
  formID: number = 50004;

  formFields: any;
  dynamicForm!: FormGroup;
  userCreated: any = localStorage.getItem("user-created");
  private formDataSubscription: Subscription = new Subscription();
  incr: any = 0;
  promisedata: any;
  formfieldname: any;
  ciItemDetailsData: any;
  cicd_id: any;
  updatebtn: boolean = false;
  enviorment: any;
  cls: any;
  sla_res: any;
  configformfiled: any;
  itemdata: any;

  subformdata: any = [];
  nosubform: any = [];
  linkListData:any;
  showform: boolean = false;

  constructor(
    private toaster: ToasterService,
    public dialog: MatDialog,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    if (!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
      
    this.dynamicForm = this.formBuilder.group({
      astd_id: this.formBuilder.control('', Validators.required),
      user_id: this.formBuilder.control('',[(Validators.required)]),
    });
    this.getFormDataById(this.formID);
  }
  ngOnInit(): void {
    var paramData = this.route.snapshot.params;
    this.cicd_id = paramData["id"];
  
    this.itemlist();
    this.getUserNameList();

  }
  itemlist() {
    this.adminService.itemList().subscribe((res: any) => {
      console.log(res);
      this.itemdata = res.result;
    });
  }
  getFormDataById(id: number): void {
    ;
    this.formDataSubscription.add(
      this.adminService.getFormByID(id).subscribe(
        (res: any) => {
          if (res.status == 200) {
            // this.configformfiled=this.formFields.filter((item:any)=>{
            //   return item.column_name=="environment" || item.column_name=="class"  || item.column_name=="sla_response"
            //   || item.column_name=="ciname"
            // })
            // console.log(this.formFields);

            // this.enviorment=this.formFields.filter((item:any)=>{
            //   return item.column_name=="environment"
            // })
            // console.log(this.enviorment);

            // this.cls=this.formFields.filter((item:any)=>{
            //   return item.column_name=="class"
            // })
            // console.log(this.cls);

            // this.sla_res=this.formFields.filter((item:any)=>{
            //   return item.column_name=="sla_response"
            // })
            // console.log(this.sla_res);
            // this.createform()
            this.configformfiled = res.rows;
            this.nosubform = res.rows;
            this.nosubform = this.nosubform.filter((item: any) => {
              return item.type != "subform";
            });
            console.log(this.configformfiled);
            this.subformdata = res.rows;
            this.subformdata = this.subformdata.filter((item: any) => {
              return item.type == "subform";
            });
            // this.formFields = this.formFields.sort((a: any, b: any) => {
            //   return a.position - b.position;
            // });
            this.configformfiled.forEach((value: any) => {
              if (value.mandatory) {
                this.dynamicForm.addControl(
                  `${value.column_label}`,
                  this.formBuilder.control(null, Validators.required)
                );
              } else {
                this.dynamicForm.addControl(
                  `${value.column_label}`,
                  this.formBuilder.control(null)
                );
              }
            });
            this.toaster.success(res.message);
            this.configdetails();
          } else {
            this.toaster.error(res.message);
          }
        },
        // (error: any) => {
        //   this.toaster.error(`${error.status} ${error.statusText}`);
        // }
      )
    );
  }
  //   createform()
  // {

  //   this.configformfiled.forEach((element:any) => {
  //     console.log(element.column_label);
  //     if(element.mandatory)
  //     {
  //       this.dynamicForm.addControl(`${element.column_label}`,this.formBuilder.control(null,Validators.required))
  //     }
  //     else
  //     {
  //       this.dynamicForm.addControl(`${element.column_label}`,this.formBuilder.control(null))

  //     }

  //   });
  //   this.configdetails()
  // }
  configdetails() {
    this.adminService.getconfigdetails(this.cicd_id).subscribe((res: any) => {
      this.ciItemDetailsData = res.result;
      console.log(this.ciItemDetailsData);
      this.pachformdata();
    });
  }

  pachformdata() {
    debugger
    setTimeout(() => {
      for(var i=0;i<this.ciItemDetailsData.length;i++)
      {
         this.dynamicForm.patchValue(this.ciItemDetailsData[i])
      }
     }, 2000);
  }
  addField(item: any) {
    const dialogRef = this.dialog.open(AddFieldComponent, {
      width: "50%",
      // scrollStrategy: new NoopScrollStrategy(),
      disableClose: true,
      data: { data: item },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getFormDataById(this.formID);
    });
  }
  submitForm() {
    debugger
    if(this.dynamicForm.invalid)
    {
      return;
    }
    this.updatebtn=true;
    var match: any = this.dynamicForm.value, error: any = [];
    this.userCreated.push(match);
    console.log(match);
    match.cicd_id=this.cicd_id;
    this.adminService.updateCI(match).subscribe((res:any)=>{
      console.log(res);
      if(res.status==200)
      {
        this.toaster.success(res.message);
        this.router.navigate(['/ci-master']);
      }
      else
      {
        this.toaster.error("Something went wrong");
        this.updatebtn=false;
      }
    },)
  }
  getUserNameList(){
    
    this.adminService.linkList(this.formID).subscribe((res:any)=>{
    console.log(res);
    this.linkListData=res.rows;
  })
  }
  ngOnDestroy(): void {
    this.formDataSubscription.unsubscribe();
  }
}
