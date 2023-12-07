import { Component } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ToasterService, AdminService, AppService } from "src/app/_services";
import { AddFieldComponent } from "src/app/master/add-field/add-field.component";

@Component({
  selector: "app-all-ticket-update",
  templateUrl: "./all-ticket-update.component.html",
  styleUrls: ["./all-ticket-update.component.css"],
})
export class AllTicketUpdateComponent {
  formFields: any;
  dynamicForm!: FormGroup;
  dynamicHouseKeepingForm: FormGroup;
  userCreated: any = localStorage.getItem("user-created");
  private formDataSubscription: Subscription = new Subscription();
  incr: any = 0;
  subformdata: any = [];
  nosubform: any = [];
  linkFormData: any = [];
  linkFormuserData: any = [];
  linkFormCIData: any = [];
  fmls_id: any;
  updateHRTicket: boolean = false;
  dynamicHRForm!: FormGroup;
  linkedData: any;
  prev_notesData:any=[];
  user: any;
  notes="";
  roleAcc: any;
  userRole: any;
  hksd_id: any;
  notes1="";
  ShowLinkedData: boolean = false;
  updateITTicket: boolean = false;
  updateHouseKeepingTicket: boolean = false;
  linkedAssetData: any;
  incidentData: any = [];
  pattern: any;
  moblength: any;
  checking: boolean = true;
  checkMandatory: boolean = false;
  checkValid: boolean = false;
  inid_id: any;
  type: any;
  hrsd_id: any;
  linkData: any;
  myFiles: any = [];
  attachment: any = [];
  filesToUpload: Array<File> = [];
  result: any;
  itUserData: any;
  HRUserData: any;
  incidentLogNotesData: any = [];
  constructor(
    private toaster: ToasterService,
    private service: AppService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.service.user.subscribe((res: any) => {
      if (res != null) {
        this.user = JSON.parse(res);
        this.userRole = this.user.roleName;
      }
    });
    this.dynamicForm = this.formBuilder.group({
      user_id: this.formBuilder.control("", [Validators.required]),
      attachment: new FormControl(""),
      ["Support Group"]: this.formBuilder.control("", [Validators.required]),
      assignto: new FormControl(null),
      prev_notes:new FormControl({value:'',disabled:true})
    });
    this.dynamicHouseKeepingForm = this.formBuilder.group({
      cicd_id: new FormControl("", [Validators.required]),
      ["Support Group"]: this.formBuilder.control("", [Validators.required]),
      attachment: new FormControl(""),
      prev_notes:new FormControl({value:'',disabled:true})
    });
    this.dynamicHRForm = this.formBuilder.group({
      ["Support Group"]: this.formBuilder.control("", [Validators.required]),
      cicd_id: new FormControl("", [Validators.required]),
      assignto: new FormControl(null),
      attachment: new FormControl(""),
      prev_notes:new FormControl({value:'',disabled:true})
    });
    if (!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
  }

  ngOnInit(): void {
    var paramData = this.route.snapshot.params;
    this.type = paramData["type"];

    if (this.type == 1) {
      this.roleAcc = "50006";
      this.inid_id = paramData["id"];
    } else if (this.type == 2) {
      this.roleAcc = "50007";
      this.hksd_id = paramData["id"];
    } else if (this.type == 3) {
      this.roleAcc = "50008";
      this.hrsd_id = paramData["id"];
    }
    this.getITUserList();
    this.getHRUserList();
    this.getFormDataById();
    this.incidentListDetails();
    this.getLinkedFormList();
    this.getLinkeddropdownFormList();
  }
  getITUserList() {
    this.adminService.getITSupportUserList().subscribe((res: any) => {
      console.log(res);
      this.itUserData = res.rows;
    });
  }
  // get prev_notes() {
  //   return this.dynamicForm.get('prev_notes') as FormArray;
  // }
  getHRUserList() {
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
        this.linkData = res.rows;
        this.linkFormCIData = this.linkData[0];
      });
    }
  }
  getLinkeddropdownFormList() {
    this.adminService.getdropdownLinkedList().subscribe((res: any) => {
      console.log(res);
      this.linkFormData = res.rows;
    });
  }
  getFormDataById(): void {
    if (this.roleAcc == "50006") {
      this.updateITTicket = true;
      this.updateHouseKeepingTicket = false;
      this.updateHRTicket = false;
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
      this.updateITTicket = false;
      this.updateHouseKeepingTicket = true;
      this.updateHRTicket = false;
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
                  this.dynamicHouseKeepingForm.addControl(
                    `${value.column_label}`,
                    this.formBuilder.control(null, Validators.required)
                  );
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
      this.updateHRTicket = true;
      this.updateITTicket = false;
      this.updateHouseKeepingTicket = false;
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
                  this.dynamicHRForm.addControl(
                    `${value.column_label}`,
                    this.formBuilder.control(null, Validators.required)
                  );
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
  //For Incident details
  incidentListDetails() {
    this.incidentData = [];
    this.incidentLogNotesData = [];
    if (this.inid_id != null && this.type == 1) {
      var patchpromise = new Promise<any>((resolve, reject) => {
        this.adminService
          .getIncidentdetailsForUpdatebyId(this.inid_id)
          .subscribe((res: any) => {
            if (res != null) {
              this.incidentLogNotesData = res["Log Notes"];
              this.incidentData = res.result;
            }

            console.log("Incident details data");
            resolve("patching");
          });
      });

      patchpromise.then((res: any) => {
        console.log("Incident details came");
        this.pachformdata();
      });
    } else if (this.hksd_id != null && this.type == 2) {
      var patchpromise = new Promise<any>((resolve, reject) => {
        this.adminService
          .getHousekeepingIncidentdetailsForUpdate(this.hksd_id)
          .subscribe((res: any) => {
            if (res != null) {
              this.incidentLogNotesData = res["Log Notes"];
              this.incidentData = res.result;
            }

            console.log("Incident details data");
            resolve("patching");
          });
      });

      patchpromise.then((res: any) => {
        console.log("Incident details came");
        this.pachformdata();
      });
    } else if (this.hrsd_id != null && this.type == 3) {
      var patchpromise = new Promise<any>((resolve, reject) => {
        this.adminService
          .getHRServiceIncidentdetailsbyIdForUpdate(this.hrsd_id)
          .subscribe((res: any) => {
            if (res != null) {
              this.incidentLogNotesData = res["Log Notes"];
              this.incidentData = res.result;
            }

            console.log("Incident details data");
            resolve("patching");
          });
      });

      patchpromise.then((res: any) => {
        console.log("Incident details came");
        this.pachformdata();
      });
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

  pachformdata() {
    console.log(this.incidentData);

    setTimeout(() => {
      if (this.inid_id != null) {
        this.dynamicForm.patchValue(this.incidentData[0]);
        if (this.incidentData[1]["User Name"].length != 0) {
          this.dynamicForm.patchValue({
            user_id: this.incidentData[1]["User Name"][0].user_id,
          });
          if (this.dynamicForm.value.user_id != null) {
            this.getIDBasedLinkingByUser(this.dynamicForm.value.user_id);
            this.dynamicForm.patchValue({
              cicd_id:
                this.incidentData[2]["Affected Assign Product"][0].cicd_id,
            });
          }
        }
        if (this.incidentLogNotesData.length != 0) {
          //this.dynamicForm.patchValue(this.incidentLogNotesData[0].table51_id);
          this.incidentLogNotesData.forEach((element:any) => {
            this.prev_notesData.push(element['Log Notes']);
          });
          this.notes = this.prev_notesData.toString(); 
          this.dynamicForm.patchValue({
            prev_notes:this.notes
          });
        }
      } else if (this.hksd_id != null) {
        this.dynamicHouseKeepingForm.patchValue(this.incidentData[0]);
        if (this.incidentLogNotesData.length != 0) {
          //this.dynamicForm.patchValue(this.incidentLogNotesData[0].table51_id);
          this.incidentLogNotesData.forEach((element:any) => {
            this.prev_notesData.push(element['Log Notes']);
          });
          this.notes = this.prev_notesData.toString(); 
          this.dynamicHouseKeepingForm.patchValue({
            prev_notes:this.notes
          });
        }
      } else if (this.hrsd_id != null) {
        this.dynamicHRForm.patchValue(this.incidentData[0]);
        if (this.incidentLogNotesData.length != 0) {
          //this.dynamicForm.patchValue(this.incidentLogNotesData[0].table51_id);
          this.incidentLogNotesData.forEach((element:any) => {
            this.prev_notesData.push(element['Log Notes']);
          });
          this.notes = this.prev_notesData.toString(); 
          this.dynamicHRForm.patchValue({
            prev_notes:this.notes
          });
        }
      }
    }, 2000);
  }

  getIDBasedLinkingByUser(userId: any) {
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
  goBack() {
    if (this.userRole == "Administrator") {
      this.router.navigate(["/allTickets"]);
    } else {
      this.router.navigate(["/it-sm"]);
    }
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
  submitForm() {
    if (this.inid_id != null) {
      // var match: any = this.dynamicForm.value, error: any = [];
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
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;

      for (let i = 0; i < this.attachment.length; i++) {
        formData.append("attachment", this.attachment[i]);
      }
      formData.append("Call Mode", this.dynamicForm.value["Call Mode"]);
      formData.append("Priority", this.dynamicForm.value.Priority);
      formData.append("Call Type", this.dynamicForm.value["Call Type"]);
      formData.append("Category", this.dynamicForm.value.Category);
      formData.append("Support Group", this.dynamicForm.value["Support Group"]);
      formData.append("user_id", this.dynamicForm.value.user_id);
      formData.append("Log Notes", this.dynamicForm.value["Log Notes"]);
      formData.append("cicd_id", this.dynamicForm.value.cicd_id);
      formData.append("Status", this.dynamicForm.value.Status);
      formData.append("assignto", this.dynamicForm.value.assignto);
      formData.append("inid_id", this.inid_id);

      this.adminService.incidentUpdate(formData).subscribe((res: any) => {
        if (res.status == 201) {
          this.toaster.success(res.message);
          if (this.userRole == "Administrator") {
            this.router.navigate(["/it-sm/allTickets"]);
          } else {
            this.router.navigate(["/it-sm"]);
          }
        } else {
          this.toaster.error("Something went wrong");
        }
      });
    }

    // localStorage.setItem('user-created', JSON.stringify(this.userCreated));
  }
  submitDynamicForm() {
    if (this.hksd_id != null) {
      if (this.dynamicHouseKeepingForm.invalid) {
        return;
      }
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
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;

      for (let i = 0; i < this.attachment.length; i++) {
        formData.append("attachment", this.attachment[i]);
      }
      formData.append("hksd_id", this.hksd_id);
      formData.append(
        "Issue Description",
        this.dynamicHouseKeepingForm.value["Issue Description"]
      );
      formData.append(
        "Guest Name",
        this.dynamicHouseKeepingForm.value["Guest Name"]
      );
      formData.append(
        "Mobile Number",
        this.dynamicHouseKeepingForm.value["Mobile Number"]
      );
      formData.append(
        "Location",
        this.dynamicHouseKeepingForm.value["Location"]
      );
      formData.append(
        "Call Type",
        this.dynamicHouseKeepingForm.value["Call Type"]
      );
      formData.append("Status", this.dynamicHouseKeepingForm.value["Status"]);
      formData.append(
        "Log Notes",
        this.dynamicHouseKeepingForm.value["Log Notes"]
      );
      formData.append(
        "Support Group",
        this.dynamicHouseKeepingForm.value["Support Group"]
      );
      formData.append("cicd_id", this.dynamicHouseKeepingForm.value.cicd_id);

      this.adminService
        .updateHousekeepingIncident(formData)
        .subscribe((res: any) => {
          if (res.status == 201) {
            this.toaster.success(res.message);
            if (this.userRole == "Administrator") {
              this.router.navigate(["/it-sm/allTickets"]);
            } else {
              this.router.navigate(["/it-sm"]);
            }
          } else {
            this.toaster.error("Something went wrong");
          }
        });
    }
  }
  submitDynamicHRForm() {
    if (this.hrsd_id != null) {
      if (this.dynamicHRForm.invalid) {
        return;
      }
      // var match: any = this.dynamicHRForm.value,
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
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;

      for (let i = 0; i < this.attachment.length; i++) {
        formData.append("attachment", this.attachment[i]);
      }

      formData.append(
        "Issue Description",
        this.dynamicHRForm.value["Issue Description"]
      );
      formData.append("Department", this.dynamicHRForm.value.Department);
      formData.append("Priority", this.dynamicHRForm.value["Priority"]);
      formData.append("Call Type", this.dynamicHRForm.value["Call Type"]);
      formData.append("Status", this.dynamicHRForm.value.Status);
      formData.append(
        "Log Notes",
        this.dynamicHRForm.value["Log Notes"]
      );
      formData.append(
        "Support Group",
        this.dynamicHRForm.value["Support Group"]
      );
      formData.append("cicd_id", this.dynamicHRForm.value.cicd_id);
      formData.append("assignto", this.dynamicHRForm.value.assignto);
      formData.append("hrsd_id", this.hrsd_id);

      this.adminService.updateHRIncident(formData).subscribe((res: any) => {
        if (res.status == 201) {
          this.toaster.success(res.message);
          if (this.userRole == "Administrator") {
            this.router.navigate(["/it-sm/allTickets"]);
          } else {
            this.router.navigate(["/it-sm"]);
          }
        } else {
          this.toaster.error("Something went wrong");
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.formDataSubscription.unsubscribe();
  }
}
