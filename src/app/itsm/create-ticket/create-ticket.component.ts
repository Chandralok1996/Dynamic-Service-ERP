import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ToasterService, AdminService, AppService } from "src/app/_services";
import { AddFieldComponent } from "src/app/master/add-field/add-field.component";

@Component({
  selector: "app-create-ticket",
  templateUrl: "./create-ticket.component.html",
  styleUrls: ["./create-ticket.component.css"],
})
export class CreateTicketComponent {
  formFields: any;
  dynamicForm!: FormGroup;
  dynamicHouseKeepingForm!: FormGroup;
  dynamicHRForm!: FormGroup;
  userCreated: any = localStorage.getItem("user-created");
  private formDataSubscription: Subscription = new Subscription();
  incr: any = 0;
  subformdata: any = [];
  nosubform: any = [];
  linkFormData: any = [];
  linkFormuserData: any = [];
  linkFormCIData: any = [];
  fmls_id: any;
  linkedData: any;
  user: any;
  roleAcc: any;
  userRole: any;
  ShowLinkedData: boolean = false;
  createITTicket: boolean = false;
  createHouseKeepingTicket: boolean = false;
  linkedAssetData: any;
  pattern: any;
  moblength: any;
  checking: boolean = true;
  checkMandatory: boolean = false;
  checkValid: boolean = false;
  createHRTicket: boolean = false;
  myFiles: any = [];
  attachment: any = [];
  filesToUpload: Array<File> = [];
  result: any;
  defaultValueh = "1000";
  defaultValue2h = "1001";
  defaultValue1 = "1000";
  defaultValue2 = "1000";
  defaultValue3h = "1003";
  defaultValue3 = "1009";
  linkData: any;
  itUserData: any;
  HRUserData: any;
  constructor(
    private toaster: ToasterService,
    public dialog: MatDialog,
    private adminService: AdminService,
    private router: Router,
    private service: AppService,
    private formBuilder: FormBuilder
  ) {
    this.service.user.subscribe((res: any) => {
      if (res != null) {
        this.user = JSON.parse(res);
        this.userRole = this.user.roleName;
        if (this.userRole == "enduser") {
          this.roleAcc = "50006";
        }
        if (this.userRole == "Guest") {
          this.roleAcc = "50007";
        } else if (this.userRole == "Housekeeping") {
          this.roleAcc = "50008";
        } else if (this.userRole == "HR") {
          this.roleAcc = "50008";
        } else if (this.userRole == "IT Engineer") {
          this.roleAcc = "50008";
        } else if (this.userRole == "Accountant") {
          this.roleAcc = "50006";
        } else if (this.userRole == "Procurement") {
          this.roleAcc = "50006";
        }
      }
    });
    this.getFormDataById();
    this.dynamicForm = this.formBuilder.group({
      user_id: new FormControl("", [Validators.required]),
      attachment: new FormControl(""),
      ["Support Group"]: new FormControl({ value: "1001", disabled: true }),
      assignto: new FormControl(null),
    });
    this.dynamicHouseKeepingForm = this.formBuilder.group({
      cicd_id: new FormControl("", [Validators.required]),
      attachment: new FormControl(""),
      ["Support Group"]: new FormControl({ value: "1007", disabled: true }),
    });
    this.dynamicHRForm = this.formBuilder.group({
      cicd_id: new FormControl("", [Validators.required]),
      attachment: new FormControl(""),
      ["Support Group"]: new FormControl({
        value: this.defaultValue3,
        disabled: true,
      }),
      assignto: new FormControl(null),
    });
    if (!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
  }

  ngOnInit(): void {
    this.getLinkedFormList();
    this.getLinkeddropdownFormList();
    this.getITUserList();
    this.getHRUserList();
  }

  getITUserList() {
    ;
    this.adminService.getITSupportUserList().subscribe((res: any) => {
      console.log(res);
      this.itUserData = res.rows;
    });
  }
  getHRUserList() {
    ;
    this.adminService.getHRUserList().subscribe((res: any) => {
      console.log(res);
      this.HRUserData = res.rows;
    });
  }
  getLinkedFormList() {
    this.linkFormuserData = [];
    this.linkFormCIData = [];
    this.linkData = [];
    if (this.roleAcc == "50006") {
      this.adminService.linkList(this.roleAcc).subscribe((res: any) => {
        console.log(res);
        this.linkData = res.rows;
        this.linkFormuserData = this.linkData[0];
      });
    } else if (this.roleAcc == "50007") {
      this.adminService.linkList(this.roleAcc).subscribe((res: any) => {
        console.log(res);
        this.linkData = res.rows;
        this.linkFormCIData = this.linkData[0];
      });
    } else if (this.roleAcc == "50008") {
      this.adminService.linkList(this.roleAcc).subscribe((res: any) => {
        console.log(res);
        this.linkFormCIData = res.rows[0];
      });
    }
  }
  getLinkeddropdownFormList() {
    this.adminService
      .getdropdownLinkedListForHousekeeping()
      .subscribe((res: any) => {
        console.log(res);
        this.linkFormData = res.rows;
      });
  }
  getFormDataById(): void {
    if (this.roleAcc == "50006") {
      this.createITTicket = true;
      this.createHouseKeepingTicket = false;
      this.createHRTicket = false;
      this.formDataSubscription.add(
        this.adminService.getFormByID(this.roleAcc).subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.formFields = res.rows;
              this.fmls_id = this.formFields[0].fmls_id;
              this.nosubform = res.rows;
              this.nosubform = this.nosubform.filter((item: any) => {
                return item.type != "subform";
              });
              console.log(this.formFields);
              this.subformdata = res.rows;
              this.subformdata = this.subformdata.filter((item: any) => {
                return item.type == "subform";
              });
              this.formFields = this.formFields.sort((a: any, b: any) => {
                return a.position - b.position;
              });
              this.formFields.forEach((value: any) => {
                if (value.mandatory) {
                  this.checkMandatory = true;
                  if (value.column_label == "Status") {
                    this.dynamicForm.addControl(
                      `${value.column_label}`,
                      this.formBuilder.control(
                        { value: this.defaultValue1, disabled: true },
                        Validators.required));
                  } else {
                    this.dynamicForm.addControl(
                      `${value.column_label}`,
                      this.formBuilder.control(null, Validators.required));
                  }
                } else {
                  // if (value.column_label == "Mobile Number") {

                  //   // this.dynamicForm.controls[`${value.column_label}`].setValidators([Validators.required,Validators.pattern('[0-9]{10}')]);
                  //   this.dynamicForm.addControl(
                  //     `${value.column_label}`,
                  //     this.formBuilder.control(null, [
                  //       Validators.pattern(
                  //         "[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
                  //       ),Validators.maxLength(10),Validators.minLength(10)
                  //     ])
                  //   );
                  //   this.pattern =
                  //     "[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";

                  //   //this.checkMandatory = false;
                  // }
                  this.dynamicForm.addControl(
                    `${value.column_label}`,
                    this.formBuilder.control(null)
                  );
                }
              });
              this.toaster.success(res.message);
            } else {
              this.toaster.error(res.message);
            }
          },
          (error: any) => {
            this.toaster.error(`${error.status} ${error.statusText}`);
          }
        )
      );
    } else if (this.roleAcc == "50007") {
      this.createITTicket = false;
      this.createHouseKeepingTicket = true;
      this.createHRTicket = false;
      this.formDataSubscription.add(
        this.adminService.getFormByID(this.roleAcc).subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.formFields = res.rows;
              this.fmls_id = this.formFields[0].fmls_id;
              this.nosubform = res.rows;
              this.nosubform = this.nosubform.filter((item: any) => {
                return item.type != "subform";
              });
              console.log(this.formFields);
              this.subformdata = res.rows;
              this.subformdata = this.subformdata.filter((item: any) => {
                return item.type == "subform";
              });
              this.formFields = this.formFields.map((res: any) => ({
                ...res,
                isactive: "",
                pattern: "",
              }));
              this.formFields = this.formFields.sort((a: any, b: any) => {
                return a.position - b.position;
              });
              this.formFields.forEach((value: any) => {
                if (value.mandatory) {
                  this.checkMandatory = true;
                  if (value.column_label == "Status") {
                    this.dynamicHouseKeepingForm.addControl(
                      `${value.column_label}`,
                      this.formBuilder.control(
                        { value: this.defaultValueh, disabled: true },
                        Validators.required
                      )
                    );
                  } else if (value.column_label == "Location") {
                    this.dynamicHouseKeepingForm.addControl(
                      `${value.column_label}`,
                      this.formBuilder.control(
                        { value: this.defaultValue1, disabled: true },
                        Validators.required
                      )
                    );
                  } else if (value.column_label == "Call Type") {
                    this.dynamicHouseKeepingForm.addControl(
                      `${value.column_label}`,
                      this.formBuilder.control(
                        { value: this.defaultValue2h, disabled: true },
                        Validators.required
                      )
                    );
                  } 
                  else if (value.column_label == "Mobile Number") {
                    // this.dynamicForm.controls[`${value.column_label}`].setValidators([Validators.required,Validators.pattern('[0-9]{10}')]);
                    this.dynamicHouseKeepingForm.addControl(
                      `${value.column_label}`,
                      this.formBuilder.control(null, [
                        Validators.required,
                        Validators.pattern(
                          "[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
                        ),
                      ])
                    );
                    (value.isactive = 10),
                      (value.pattern = `[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`);
                    this.pattern = "[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";
                  }
                  else {
                    this.dynamicHouseKeepingForm.addControl(
                      `${value.column_label}`,
                      this.formBuilder.control(null, Validators.required)
                    );
                    value.isactive = "";
                    value.pattern = "";
                  }
                } else {
                  // if (value.column_label == "Mobile Number") {

                  //   // this.dynamicForm.controls[`${value.column_label}`].setValidators([Validators.required,Validators.pattern('[0-9]{10}')]);
                  //   this.dynamicForm.addControl(
                  //     `${value.column_label}`,
                  //     this.formBuilder.control(null, [
                  //       Validators.pattern(
                  //         "[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
                  //       ),Validators.maxLength(10),Validators.minLength(10)
                  //     ])
                  //   );
                  //   this.pattern =
                  //     "[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";

                  //   //this.checkMandatory = false;
                  // }
                  this.dynamicHouseKeepingForm.addControl(
                    `${value.column_label}`,
                    this.formBuilder.control(null)
                  );
                }
              });
              this.toaster.success(res.message);
            } else {
              this.toaster.error(res.message);
            }
          },
          (error: any) => {
            this.toaster.error(`${error.status} ${error.statusText}`);
          }
        )
      );
    } else if (this.roleAcc == "50008") {
      this.createHRTicket = true;
      this.createITTicket = false;
      this.createHouseKeepingTicket = false;

      this.formDataSubscription.add(
        this.adminService.getFormByID(this.roleAcc).subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.formFields = res.rows;
              this.fmls_id = this.formFields[0].fmls_id;
              this.nosubform = res.rows;
              this.nosubform = this.nosubform.filter((item: any) => {
                return item.type != "subform";
              });
              console.log(this.formFields);
              this.subformdata = res.rows;
              this.subformdata = this.subformdata.filter((item: any) => {
                return item.type == "subform";
              });
              this.formFields = this.formFields.sort((a: any, b: any) => {
                return a.position - b.position;
              });
              this.formFields.forEach((value: any) => {
                if (value.mandatory) {
                  this.checkMandatory = true;
                  if (value.column_label == "Status") {
                    this.dynamicHRForm.addControl(
                      `${value.column_label}`,
                      this.formBuilder.control(
                        { value: this.defaultValue2, disabled: true },
                        Validators.required
                      )
                    );
                  } else if (value.column_label == "Call Type") {
                    this.dynamicHRForm.addControl(
                      `${value.column_label}`,
                      this.formBuilder.control(
                        { value: this.defaultValue2h, disabled: true },
                        Validators.required
                      )
                    );
                  } else if (value.column_label == "Department") {
                    this.dynamicHRForm.addControl(
                      `${value.column_label}`,
                      this.formBuilder.control(
                        { value: this.defaultValue2, disabled: true },
                        Validators.required
                      )
                    );
                  } else if (value.column_label == "Priority") {
                    this.dynamicHRForm.addControl(
                      `${value.column_label}`,
                      this.formBuilder.control("1001", Validators.required)
                    );
                  } else {
                    this.dynamicHRForm.addControl(
                      `${value.column_label}`,
                      this.formBuilder.control(null, Validators.required)
                    );
                  }
                } else {
                  // if (value.column_label == "Mobile Number") {

                  //   // this.dynamicForm.controls[`${value.column_label}`].setValidators([Validators.required,Validators.pattern('[0-9]{10}')]);
                  //   this.dynamicForm.addControl(
                  //     `${value.column_label}`,
                  //     this.formBuilder.control(null, [
                  //       Validators.pattern(
                  //         "[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
                  //       ),Validators.maxLength(10),Validators.minLength(10)
                  //     ])
                  //   );
                  //   this.pattern =
                  //     "[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";

                  //   //this.checkMandatory = false;
                  // }
                  this.dynamicHRForm.addControl(
                    `${value.column_label}`,
                    this.formBuilder.control(null)
                  );
                }
              });
              this.toaster.success(res.message);
            } else {
              this.toaster.error(res.message);
            }
          },
          (error: any) => {
            this.toaster.error(`${error.status} ${error.statusText}`);
          }
        )
      );
    }
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

  getIDBasedLinkingByUser(userId: any) {
    ;
    this.linkedData = [];
    this.linkedAssetData = [];
    var userData = {
      fmls_id: this.fmls_id,
      id: [userId],
    };
    this.adminService.getIDBasedLinking(userData).subscribe((res: any) => {
      if (res.status == 200) {
        this.linkedData = res.rows;

        this.linkedData.forEach((element: any) => {
          if (element["Affected Assign Product"].length > 0) {
            this.linkedAssetData = element["Affected Assign Product"];
            if (this.linkedAssetData.length != 0) {
              this.ShowLinkedData = true;
              this.dynamicForm.addControl(
                "cicd_id",
                this.formBuilder.control("", Validators.required)
              );
            }
          } else {
            this.ShowLinkedData = false;
          }
        });

        this.toaster.success(res.message);
      } else {
        this.toaster.error("Something went wrong");
      }
    });
  }

  addField(item: any) {
    const dialogRef = this.dialog.open(AddFieldComponent, {
      width: "50%",
      // scrollStrategy: new NoopScrollStrategy(),
      disableClose: true,
      data: { data: item },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getFormDataById();
    });
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = [];
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  listOfFiles: any[] = [];

  onFileChanged(event: any) {
    this.attachment = [];
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.listOfFiles.push(selectedFile.name);
      this.attachment.push(selectedFile);
    }
    console.log(this.attachment);
    // this.attachment.nativeElement.value = '';
  }

  removeSelectedFile(index: any) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    this.attachment.splice(index, 1);
  }
  getAssignedToValue(){
    
    if(this.dynamicForm.value.assignto != null){
      return this.dynamicForm.value.assignto;
    }
    else{
      this.dynamicForm.patchValue({assignto:undefined})
    }
   if(this.dynamicHRForm.value.assignto != null)
    {
      return this.dynamicHRForm.value.assignto;
    }
    else{
      this.dynamicHRForm.patchValue({assignto:undefined})
    }
  }
  submitForm() {
    
    if (this.dynamicForm.invalid) {
      return;
    }
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
  

    formData.append(
      "Issue Description",
      this.dynamicForm.value["Issue Description"]
    );
    formData.append("Call Mode", this.dynamicForm.value["Call Mode"]);
    formData.append("Priority", this.dynamicForm.value.Priority);
    formData.append("Call Type", this.dynamicForm.value["Call Type"]);
    formData.append("Category", this.dynamicForm.value.Category);
    formData.append("Support Group", "1001");
    formData.append("user_id", this.dynamicForm.value.user_id);
    // formData.append('astd_id', this.dynamicForm.value.astd_id);
    formData.append("cicd_id", this.dynamicForm.value.cicd_id);
    formData.append("Status", 1000);
    var someValue = this.getAssignedToValue(); 
if (someValue !== undefined) {
    formData.append('assignto', someValue);
}
 //   formData.append("assignto",null);

    // var match: any = this.dynamicForm.value,
    //   error: any = [];
    // this.formFields.forEach((element: any) => {
    //   if (element.mandatory) {
    //     if (!match[element.column_label]) {
    //       error.push(`${element.column_label}`);
    //     }
    //   }
    // });
    // console.log(error);
    // if (error.length > 0) {
    //   this.toaster.warning(`${error} is required!`);
    //   return;
    // }
    // this.userCreated.push(match);
    // console.log(match);
    this.adminService.incidentCreate(formData).subscribe((res: any) => {
      if (res.status == 201) {
        this.toaster.success(res.message);
        this.router.navigate(["/it-sm"]);
      } else {
        this.toaster.error("Something went wrong");
      }
    });
    // localStorage.setItem('user-created', JSON.stringify(this.userCreated));
  }
  submitDynamicForm() {
    if (this.dynamicHouseKeepingForm.invalid) {
      return;
    }
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
    formData.append("cicd_id", this.dynamicHouseKeepingForm.value.cicd_id);
    formData.append(
      "Guest Name",
      this.dynamicHouseKeepingForm.value["Guest Name"]
    );
    formData.append(
      "Mobile Number",
      this.dynamicHouseKeepingForm.value["Mobile Number"]
    );
    formData.append(
      "Issue Description",
      this.dynamicHouseKeepingForm.value["Issue Description"]
    );
    // formData.append("actionid",this.accountService.user.response.userId);
    formData.append("Support Group", "1007");
    formData.append("Status", 1000);
    formData.append("Location", 1000);
    formData.append("Call Type", 1001);
    // var match: any = this.dynamicHouseKeepingForm.value,
    //   error: any = [];
    // this.formFields.forEach((element: any) => {
    //   if (element.mandatory) {
    //     if (!match[element.column_label]) {
    //       error.push(`${element.column_label}`);
    //     }
    //   }
    // });
    // console.log(error);
    // if (error.length > 0) {
    //   this.toaster.warning(`${error} is required!`);
    //   return;
    // }
    // this.userCreated.push(match);
    // console.log(match);
    this.adminService
      .incidentCreateForHousekeeping(formData)
      .subscribe((res: any) => {
        if (res.status == 201) {
          this.toaster.success(res.message);
          this.router.navigate(["/it-sm"]);
        } else {
          this.toaster.error("Something went wrong");
        }
      });
  }
  submitDynamicHRForm() {
    if (this.dynamicHRForm.invalid) {
      return;
    }
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
   // var valueToSend = this.dynamicHRForm.value.assignto !== null ? this.dynamicHRForm.value.assignto : null;

    // formData.append("Mobile Number", this.dynamicForm.value['Mobile Number']);
    formData.append(
      "Issue Description",
      this.dynamicHRForm.value["Issue Description"]
    );
    formData.append("Department", "1000");
    formData.append("Priority", this.dynamicHRForm.value["Priority"]);
    formData.append("Call Type", "1001");
    formData.append("Status", 1000);
    formData.append("Support Group", "1009");
    formData.append("cicd_id", this.dynamicHRForm.value.cicd_id);
    var someValue = this.getAssignedToValue(); 
    if (someValue !== undefined) {
        formData.append('assignto', someValue);
    }
    //   var match: any = this.dynamicHRForm.value,
    //     error: any = [];
    //   this.formFields.forEach((element: any) => {
    //     if (element.mandatory) {
    //       if (!match[element.column_label]) {
    //         error.push(`${element.column_label}`);
    //       }
    //     }
    //   });
    //   console.log(error);
    //   if (error.length > 0) {
    //     this.toaster.warning(`${error} is required!`);
    //     return;
    //   }
    //  this.userCreated.push(match);
    //   console.log(match);
    this.adminService.createHRIncident(formData).subscribe((res: any) => {
      if (res.status == 201) {
        this.toaster.success(res.message);
        this.router.navigate(["/it-sm"]);
      } else {
        this.toaster.error("Something went wrong");
      }
    });
  }
  ngOnDestroy(): void {
    this.formDataSubscription.unsubscribe();
  }
  onEnter(event:any){
    
    if (event.source.value != '') {
    //  this.ShowLinkedData = true;
      this.getIDBasedLinkingByUser(event.source.value);
      }
      else{
        this.ShowLinkedData = false;
        this.toaster.warning('Please select User from list');
      }
  }
}
