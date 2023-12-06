import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ToasterService, AdminService } from "src/app/_services";
import { AddFieldComponent } from "../../add-field/add-field.component";
import { MatSelectChange } from "@angular/material/select";
@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.css"],
})
export class UserUpdateComponent {
  formID: number = 50001;
  formFields: any;
  dynamicForm!: FormGroup;
  userCreated: any = localStorage.getItem("user-created");
  private formDataSubscription: Subscription = new Subscription();
  @ViewChild("changeEl") el!: ElementRef;
  incr: any = 0;
  promisedata: any;
  userlistdata: any;
  userid: any;
  nosubform: any = [];
  subformdata: any = [];
  selectedData: any;
  assign: any;
  dataform: any;
  formshow: boolean = false;
  updatebtn: boolean = false;
  pattern: any;
  epattern: any;
  checking: boolean = true;
  checkMandatory: boolean = false;
  checkValid: boolean = false;
  match: any;
  supportGroupAdded: any;
  supportGroupRemoved: any = [];
  supportGroupValue: any = [];
  supportGroupCreated: any = [];
  userRoleCreated: any = [];
  userRoleAdded: any;
  userRoleRemoved: any = [];
  userRoleValue: any = [];
  checkElement:boolean=false;
  userRoleRemovedData:any;
  supportGroupRemovedData:any;
  checkRoleElement:boolean=false;
  userRoleData = { add: [], remove: [] };
  supportGroupData = { add: [], remove: [] };
  constructor(
    private toaster: ToasterService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,

    private formBuilder: FormBuilder
  ) {
    this.dynamicForm = this.formBuilder.group({});
    if (!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
  }

  ngOnInit(): void {
    var paramData = this.route.snapshot.params;
    // console.log(paramData);
    this.userid = paramData["id"];
    // console.log(this.userid);

    this.getFormDataById(this.formID);
  }

  getFormDataById(id: number): void {
    ;
    this.promisedata = new Promise<any>((resolve, reject) => {
      console.log("geting form column");
      this.formDataSubscription.add(
        this.adminService.getFormByID(id).subscribe((res: any) => {
          if (res.status == 200) {
            this.formFields = res.rows;

            // console.log(this.formFields);
            this.nosubform = res.rows;
            // console.log(this.nosubform);

            this.nosubform = this.nosubform.filter((item: any) => {
              return item.type != "subform";
            });
            this.nosubform = this.nosubform.filter((item: any) => {
              return item.type != "password";
            });
            var assign = this.nosubform.filter((item: any) => {
              return item.type == "assigndropdown";
            });
            // console.log(assign);
            this.assign = assign;
            this.subformdata = res.rows;
            this.subformdata = this.subformdata.filter((item: any) => {
              return item.type == "subform";
            });
            // this.formFields = this.formFields.sort((a: any, b: any) => {
            //   return a.position - b.position;
            // });
            this.subformdata = this.subformdata.map((res: any) => ({
              ...res,
              isactive: "",
              pattern: "",
            }));
            console.log(this.subformdata);
            this.subformdata.forEach((element: any) => {
              if (element.column_label == "Mobile Number") {
                (element.isactive = 10),
                  (element.pattern = `[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}`);
              } else if (element.column_label == "Email Id") {
                (element.isactive = ""),
                  (element.pattern = `[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`);
              } else {
                element.isactive = "";
                element.pattern = "";
              }
            });
            console.log(this.subformdata);

            // this.formFields = this.formFields.sort((a: any, b: any) => {
            //   return a.position - b.position;
            // });
            this.formFields.forEach((value: any) => {
              // console.log(value);
              if (value.column_label == "Support Group") {
                this.supportGroupCreated.push(value.column_value);
              }
              if (value.column_label == "User Role") {
                this.userRoleCreated.push(value.column_value);
              }
              if (value.mandatory) {
                this.checkMandatory = true;
                if (value.type == "password" && value.update_column == false) {
                  this.dynamicForm.removeControl(`${value.column_label}`);
                } else if (value.column_label == "Email Id") {
                  this.dynamicForm.addControl(
                    `${value.column_label}`,
                    this.formBuilder.control(null, [
                      Validators.required,
                      Validators.pattern(
                        "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
                      ),
                    ])
                  );
                  this.checkValid = true;
                  // this.dynamicForm.controls[`${value.column_label}`].setValidators([Validators.required,Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$')]);
                  this.pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
                } else if (value.column_label == "Mobile Number") {
                  // this.dynamicForm.controls[`${value.column_label}`].setValidators([Validators.required,Validators.pattern('[0-9]{10}')]);
                  this.dynamicForm.addControl(
                    `${value.column_label}`,
                    this.formBuilder.control(null, [
                      Validators.required,
                      Validators.pattern(
                        "[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
                      ),
                    ])
                  );
                  this.checkValid = true;
                  this.pattern =
                    "[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";
                } else {
                  this.dynamicForm.addControl(
                    `${value.column_label}`,
                    this.formBuilder.control(null, Validators.required)
                  );
                }
              } else {
                this.dynamicForm.addControl(
                  `${value.column_label}`,
                  this.formBuilder.control(null)
                );
                this.checkMandatory = false;
                this.checkValid = false;
              }
            });
            this.toaster.success(res.message);
          } else {
            this.toaster.error(res.message);
          }
        })
      );
      resolve("done");
    });

    this.promisedata.then((res: any) => {
      console.log("column successfully ");
      this.userlist();
    });
  }
  patchfun() {}

  onItemDeSelect(data: any) {
    // console.log(data);
  }

  //user details or user list
  userlist() {
    ;
    var patchpromise = new Promise<any>((resolve, reject) => {
      this.adminService.getuserdetails(this.userid).subscribe((res: any) => {
        this.userlistdata = res.result;

        this.userlistdata.map((res: any) => {
          // console.log(res);
        });

        console.log("user details data");
        resolve("patching");
      });
    });

    patchpromise.then((res: any) => {
      console.log("user details came");
      this.pachformdata();
    });
  }
  // ngAfterViewInit() {
  //   ;
  //   this.selectionChange(this.el);
  // }
  pachformdata() {
    ;
    this.formshow = true;
    if (this.formshow == true) {
      setTimeout(() => {
        for (var i = 0; i < this.userlistdata.length; i++) {
          this.dynamicForm.patchValue(this.userlistdata[i]);
        }
        // this.dynamicForm.patchValue(this.userlistdata[0])
        // this.dynamicForm.patchValue(this.userlistdata[1])
        // this.dynamicForm.patchValue(this.userlistdata[2])
        // this.dynamicForm.patchValue(this.userlistdata[3])
      }, 2000);
    }
    console.log(this.userlistdata[0]);
    this.userlistdata.forEach((element2: any) => {
      if (element2["Support Group"]) {
        this.supportGroupValue = element2["Support Group"];
      }
      if (element2["User Role"]) {
        this.userRoleValue = element2["User Role"];
      }
    });
    console.log(this.supportGroupValue);
    console.log(this.userRoleValue);
    // this.dynamicForm.patchValue(this.userlistdata[1])
    // this.dynamicForm.patchValue(this.userlistdata[2])
    // this.dynamicForm.patchValue(this.userlistdata[3])
  }
  onItemSelect(data: any, event: any) {
    // console.log(event.value);
  }
  selectionChange(event: any) {
    ;
    console.log(event.value);
  }
  OnlyNumbersAllowed(event: any, data: any): boolean {
    console.log(event);
    if (data == "Mobile Number") {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        console.log("charCode restricted is " + charCode);
        this.checking = false;
        return this.checking;
      } else {
        this.checking = true;

        return this.checking;
      }
    } else {
      this.checking = true;
    }
    return this.checking;
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
  onSelectValue(data1: any, event: any) {
    ;
    this.supportGroupRemoved.push(data1);
  }
  submitForm() {
    this.updatebtn = true;
   
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
   
    this.supportGroupAdded = this.dynamicForm.value["Support Group"];
    this.supportGroupData.add=this.supportGroupAdded;
    this.supportGroupAdded.forEach((element: any) => {
      this.supportGroupValue.forEach((element1: any) => {
        if (element1 !== element) {
        // this.checkElement = this.supportGroupRemoved.includes(element1);
        //  if(this.checkElement == true)
        //  {
        //   this.supportGroupRemoved.pop(element1);

        //  }
        //  else{
         // this.supportGroupRemoved.push(element1);
          if(this.supportGroupValue.length>0)
          {
            if(this.supportGroupRemoved.length>0){
              this.supportGroupRemoved.forEach((element3:any) => {
                if(element1!=element3)
                {
                  this.supportGroupRemoved.push(element1);
                }
               
              });
            }
          else{
            this.supportGroupRemoved.push(element1);
          }
          }
       

     //    }

        } else {
          this.supportGroupRemoved = [];
        }
      });
    });
    this.supportGroupRemovedData=this.supportGroupRemoved.filter((ele:any,index:any)=>this.supportGroupRemoved.indexOf(ele)===index)

    this.supportGroupData.remove=this.supportGroupRemovedData;

   
    this.userRoleAdded = this.dynamicForm.value["User Role"];
    this.userRoleData.add = this.userRoleAdded;
    this.userRoleAdded.forEach((element: any) => {
      this.userRoleValue.forEach((element1: any) => {
        if (element1 !== element) {
        //  this.checkRoleElement = this.userRoleRemoved.includes(element1);
        //  if(this.checkRoleElement == true)
        //  {
        //   this.userRoleRemoved.pop(element1);

        //  }
        //  else{
        //   this.userRoleRemoved.push(element1);

        //  }
        if(this.userRoleValue.length>0)
        {
          if(this.userRoleRemoved.length>0){
            this.userRoleRemoved.forEach((element4:any) => {
              if(element1!=element4)
              {
                this.userRoleRemoved.push(element1);
              }
             
            });
          }
        else{
          this.userRoleRemoved.push(element1);
        }
        }
        } else {
          this.userRoleRemoved = [];
        }
      });
    });
    this.userRoleRemovedData=this.userRoleRemoved.filter((ele:any,index:any)=>this.userRoleRemoved.indexOf(ele)===index)
    this.userRoleData.remove=this.userRoleRemovedData;
    this.dynamicForm.value['Support Group']=this.supportGroupData;
    this.dynamicForm.value['User Role']=this.userRoleData;
    var match: any = this.dynamicForm.value,
    error: any = [];
    this.userCreated.push(match);

    match.user_id = this.userid;
    this.adminService.updateuser(match).subscribe(
      (res: any) => {
        // console.log(res);

        if (res.message == "User Updated successfully") {
          this.toaster.success(res.message);
          this.router.navigate(["/user-master"]);
        } else {
          this.toaster.error("Something went wrong");
          this.updatebtn = false;
        }
      },
      (error: any) => {
        // console.log();

        this.toaster.success(error.error.message);
      }
    );
    localStorage.setItem("user-created", JSON.stringify(this.userCreated));
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
