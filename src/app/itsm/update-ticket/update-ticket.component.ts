import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService, AdminService, AppService } from 'src/app/_services';
import { AddFieldComponent } from 'src/app/master/add-field/add-field.component';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent {
  formID=[50006,50007];
  formFields: any;
  dynamicForm!: FormGroup;
  dynamicHouseKeepingForm:FormGroup;
  dynamicHRForm!:FormGroup;
  userCreated: any = localStorage.getItem("user-created");
  private formDataSubscription: Subscription = new Subscription();
  incr: any = 0;
  subformdata: any = [];
  nosubform: any = [];
  linkFormData:any=[];
  linkFormuserData:any=[];
  linkFormCIData:any=[];
  fmls_id:any;
  linkedData:any;
  user:any;
  roleAcc:any;
  userRole:any;
  hksd_id:any;
  ShowLinkedData:boolean=false;
  updateITTicket:boolean=false;
  updateHouseKeepingTicket:boolean=false;
  updateHRTicket:boolean=false;
  linkedAssetData:any;
  incidentData:any=[]
  pattern: any;
  moblength: any;
  checking: boolean = true;
  checkMandatory: boolean = false;
  checkValid:boolean=false;
  inid_id:any;
  type:any;
  hrsd_id:any;
  linkData:any;

  constructor(private toaster: ToasterService, private service: AppService, public dialog: MatDialog,private route: ActivatedRoute,private adminService: AdminService, private router: Router, private formBuilder: FormBuilder) {
   
  
     this.dynamicForm = this.formBuilder.group({
      user_id: this.formBuilder.control('',[(Validators.required)]),
    });
    this.dynamicHouseKeepingForm = this.formBuilder.group({
      cicd_id: new FormControl('',[(Validators.required)]),
      ['Support Group']: this.formBuilder.control('',[(Validators.required)])
    });
    this.dynamicHRForm = this.formBuilder.group({
      ['Support Group']: this.formBuilder.control('',[(Validators.required)])
    });
    if(!this.userCreated) {
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
      else if (this.type == 3) {
        this.roleAcc = "50008";
        this.hrsd_id = paramData["id"];
      }
      else if (this.type == 3) {
        this.roleAcc = "50008";
        this.hrsd_id = paramData["id"];
      }
    
    this.getFormDataById();
    this.incidentListDetails();
    this.getLinkedFormList();
    this.getLinkeddropdownFormList();
  }

  getLinkedFormList() {
    this.roleAcc="";
    this.linkFormuserData=[];
    this.linkFormCIData=[];
    this.linkData=[];
    if(this.type == 1){
      this.roleAcc = "50006";
    this.adminService.linkList(this.roleAcc).subscribe((res:any)=>{
      console.log(res);
      this.linkData=res.rows;
      this.linkFormuserData=this.linkData[0];
    })
  }
  else if(this.type==2)
  {
    this.roleAcc = "50007";
    this.adminService.linkList(this.roleAcc).subscribe((res:any)=>{
      console.log(res);
      this.linkData=res.rows;
      this.linkFormCIData=this.linkData[0];
    })
  }
  else if(this.type == 3)
  {
    this.roleAcc = "50008";
    this.adminService.linkList(this.roleAcc).subscribe((res:any)=>{
      console.log(res);
      this.linkFormCIData=res.rows;
    })
  }
  }
  getLinkeddropdownFormList() {
    this.adminService.getdropdownLinkedList().subscribe((res: any) => {
      console.log(res);
      this.linkFormData = res.rows;
    });
  }
  getFormDataById(): void {
    this.formFields=[];
    this.nosubform=[];
    this.roleAcc="";
   if(this.type == 1){
    this.roleAcc = "50006";
    this.updateITTicket=true;
    this.updateHouseKeepingTicket=false;
    this.updateHRTicket=false;
      this.formDataSubscription.add(
        this.adminService.getFormByID(this.roleAcc).subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.formFields = res.rows;
              this.fmls_id=this.formFields[0].fmls_id;
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
                }
               
                else {
                  
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
    }
 else if(this.type == 2)
 {
  this.roleAcc = "50007";
  this.updateITTicket=false;
  this.updateHouseKeepingTicket=true;
  this.updateHRTicket=false;
  this.formDataSubscription.add(
    this.adminService.getFormByID(this.roleAcc).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.formFields = res.rows;
          this.fmls_id=this.formFields[0].fmls_id;
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
            }
           
            else {
              
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
 }
 else if(this.type == 3)
 {
  this.roleAcc = "50008"
  this.updateHRTicket=true;
  this.updateITTicket=false;
  this.updateHouseKeepingTicket=false;
 
  this.formDataSubscription.add(
    this.adminService.getFormByID(this.roleAcc).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.formFields = res.rows;
          this.fmls_id=this.formFields[0].fmls_id;
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
            }
           
            else {
              
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
   incidentListDetails()
   {
    
 if(this.inid_id!=null){
  var patchpromise = new Promise<any>((resolve, reject) => {
    this.adminService.getIncidentdetailsForUpdatebyId(this.inid_id).subscribe((res: any) => {
      this.incidentData = res.result;
      this.incidentData.map((res: any) => {
        // console.log(res);
      });

      console.log("Incident details data");
      resolve("patching");
    });
  });

  patchpromise.then((res: any) => {
    console.log("Incident details came");
    this.pachformdata();
  });
 }
else if(this.hksd_id!=null)
 {
  var patchpromise = new Promise<any>((resolve, reject) => {
    this.adminService.getHousekeepingIncidentdetailsForUpdate(this.hksd_id).subscribe((res: any) => {
      this.incidentData = res.result;
      this.incidentData.map((res: any) => {
        // console.log(res);
      });

      console.log("Incident details data");
      resolve("patching");
    });
  });

  patchpromise.then((res: any) => {
    console.log("Incident details came");
    this.pachformdata();
  });
 }
 else if(this.hrsd_id!=null)
 {
  var patchpromise = new Promise<any>((resolve, reject) => {
    this.adminService.getHRServiceIncidentdetailsbyIdForUpdate(this.hrsd_id).subscribe((res: any) => {
      this.incidentData = res.result;
      this.incidentData.map((res: any) => {
        // console.log(res);
      });

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

 
   pachformdata()
   {
     
  console.log(this.incidentData);
   
   setTimeout(() => {
    //  for (var i = 0; i < this.incidentData.length; i++) {
    //    this.dynamicForm.patchValue(this.incidentData[i]);
    //    this.dynamicForm.patchValue(this.incidentData[0]);
    //  }
    if(this.inid_id!=null){
      this.dynamicForm.patchValue(this.incidentData[0]);
      if(this.incidentData[1]['User Name'].length!=0)
      {
        this.dynamicForm.patchValue({
          user_id: this.incidentData[1]['User Name'][0].user_id, 
        });
        if(this.dynamicForm.value.user_id != null)
        {
          this.getIDBasedLinkingByUser(this.dynamicForm.value.user_id);
         // this.dynamicForm.setValue('astd_id', this.formBuilder.control('', Validators.required));
          // this.dynamicForm.patchValue({
          //   astd_id: this.incidentData[2]['Affected Product'][0].astd_id, 
          // }); 
        }
      }
    }
    else if(this.hksd_id!=null)
    {
      this.dynamicHouseKeepingForm.patchValue(this.incidentData[0]);
    }
    else if(this.hrsd_id!=null)
    {
      this.dynamicHRForm.patchValue(this.incidentData[0]);
    }
   }, 2000);
   }

  getIDBasedLinkingByUser(userId:any){
    
    var userData={
       fmls_id:this.fmls_id,
       id:[userId]
    }
    this.adminService.getIDBasedLinking(userData).subscribe((res: any) => {
      if (res.status == 200) {
        this.linkedData=res.rows;
        this.linkedData.forEach((element:any) => {
          if(element['Affected Product'].length>0)
          {
            this.linkedAssetData=element['Affected Product'];
        this.ShowLinkedData=true;
            this.dynamicForm.addControl('astd_id', this.formBuilder.control('', Validators.required));
        
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
      width: '50%',
     // scrollStrategy: new NoopScrollStrategy(),
      disableClose: true,
      data: { data: item }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getFormDataById();
    })


  
  }
  submitForm() {
    
    if(this.inid_id!=null){
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

    // var match={
    //   'inid_id':this.inid_id,
    //   'Detail Description':this.dynamicForm.value['Detail Description'],
    // 'Mobile Number': this.dynamicForm.value['Mobile Number'],
    // "Asset Group":this.dynamicForm.value['Asset Group'],
    // "Call Mode":this.dynamicForm.value['Call Mode'],
    // "Priority": this.dynamicForm.value.Priority,
    // "Call Type":this.dynamicForm.value['Call Type'],
    // "Call Category":this.dynamicForm.value['Call Category'],
    // "Issue Description":this.dynamicForm.value['Issue Description'],
    // "user_id":this.dynamicForm.value.user_id,
    // "astd_id":this.dynamicForm.value.astd_id
    // }
    match.inid_id=this.inid_id;
    this.adminService.incidentUpdate(match).subscribe((res:any)=>{
      if(res.status==201)
      {
        this.toaster.success(res.message);
        this.router.navigate(["/it-sm"]);
      }
      else
      {
        this.toaster.error("Something went wrong");
      }
    },)
  }
  
    // localStorage.setItem('user-created', JSON.stringify(this.userCreated));
  }
  submitDynamicForm(){
    
    if(this.hksd_id!=null){
    if (this.dynamicHouseKeepingForm.invalid) {
      return;
    }
    var match: any = this.dynamicHouseKeepingForm.value,
      error: any = [];
    this.formFields.forEach((element: any) => {
      if (element.mandatory) {
        if (!match[element.column_label]) {
          error.push(`${element.column_label}`);
        }
      }
    });
    console.log(error);
    if (error.length > 0) {
      this.toaster.warning(`${error} is required!`);
      return;
    }
    this.userCreated.push(match);
    console.log(match);
    match.hksd_id=this.hksd_id;
    this.adminService.updateHousekeepingIncident(match).subscribe((res: any) => {
      if (res.status == 201) {
        this.toaster.success(res.message);
        this.router.navigate(["/it-sm"]);
      } else {
        this.toaster.error("Something went wrong");
      }
    });
  }
  }
  submitDynamicHRForm(){
    
    if(this.hrsd_id!=null){
      if (this.dynamicHRForm.invalid) {
        return;
      }
      var match: any = this.dynamicHRForm.value,
        error: any = [];
      this.formFields.forEach((element: any) => {
        if (element.mandatory) {
          if (!match[element.column_label]) {
            error.push(`${element.column_label}`);
          }
        }
      });
      console.log(error);
      if (error.length > 0) {
        this.toaster.warning(`${error} is required!`);
        return;
      }
      this.userCreated.push(match);
      console.log(match);
      match.hrsd_id=this.hrsd_id;
      this.adminService.updateHRIncident(match).subscribe((res: any) => {
        if (res.status == 201) {
          this.toaster.success(res.message);
          this.router.navigate(["/it-sm"]);
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

