import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";
import { AdminService, AppService, ToasterService } from "src/app/_services";

@Component({
  selector: "app-create-approval",
  templateUrl: "./create-approval.component.html",
  styleUrls: ["./create-approval.component.css"],
})
export class CreateApprovalComponent {
  showPass: boolean = true;
  form: any;
  showModal: boolean = false;
  approvalDetails: any[] = [];
  modulelist: any;
  fieldList: any;
  approvalCondition: any;
  selectedCondition: any;
  formFields: any = [];
  formFieldValueData: any = [];
  formFieldsData: any;
  operators: any = ["=", ">", "<", "!="];
  orgID=901;
  table_name: any;
  approverList: any;
  approverRoleData: any;
  approverListData:any;
  approverTypeData:any;
  showRole:boolean=false;
  showUser:boolean=false;
  formData:any;
  moduleName:any;
  FieldName:any;
  tableValue:any;
  checked:boolean=false;
  condition1:any;
  radioChecked:boolean=false;
  private subscription: Subscription = new Subscription();

  constructor(
    private toaster: ToasterService,
    private adminService: AdminService,
    private service: AppService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formData=this.adminService.getData();
    this.moduleName = this.formData.formName;
    this.FieldName = this.formData.column_label;
    this.tableValue = this.formData.column_value;
    if(this.formData.type == "dropdown" || this.formData.type == "assigndropdown")
    {
      this.showModal = true;
    }
    else{
      this.showModal = false;
    }
    this.form = new FormGroup({
      module_name: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      condition: new FormControl("", [Validators.required]),
      select_value: new FormControl("", [Validators.required]),
     // equals: new FormControl("", [Validators.required]),
      table_value: new FormControl("", [Validators.required]),
      approver_name: new FormControl("", [Validators.required]),
      role_name: new FormControl("", [Validators.required]),
      checked1: new FormControl("", [Validators.required]),
    });
    this.getFormModuleList();
   this.getApproverList();
  }

  get formCtrl() {
    return this.form.controls;
  }
  getFormModuleList() {
    this.adminService.getFormList().subscribe((res: any) => {
      if (res.status) {
        this.modulelist = res.rows;
        this.fieldList = [];
      } else {
        this.toaster.error(res.message);
      }
    });
  }
  getApproverList() {
    debugger;
    this.adminService.getapprovalListDetails().subscribe((res: any) => {
      if (res.status) {
        this.approvalCondition = res.condition;
        this.approverListData = res.approversList;
        this.approverTypeData = res.type;
        this.approverRoleData = res.role;
      } else {
        this.toaster.error(res.message);
      }
    });
  }
  getfieldValue(data1: any) {
    debugger;
    this.formFieldValueData = data1.column_value;
    this.table_name = data1.table_name;
  }
  getFormID(data: any) {
    debugger;
    this.adminService.getFormByID(data.fmls_id).subscribe((res: any) => {
      if (res.status == 200) {
        this.formFieldsData = res.rows;
        this.formFieldsData.forEach((element: any) => {
          if (element.type == "assigndropdown" || element.type == "dropdown") {
            this.formFields.push(element);
          }
        });
      } else {
        this.toaster.error(res.message);
      }
    });
  }



  onSelectType(data1:any){
    debugger
    if(data1.type == "user")
    {
    this.showRole = false;
    this.showUser = true;
    this.approverList=this.approverListData;
    }
    else if(data1.type == "role")
    {
    this.showUser = false;
    this.showRole = true;
    this.approverList=this.approverRoleData;
    }
  }
  onRadioChange(event: any) {
    debugger;
    // Get the selected value
    this.selectedCondition = event.type;
    if (this.selectedCondition == "On-Condition") {
      this.showModal = true;
    } else {
      this.showModal = false;
    }
  }
  submitForm(): void {
    debugger;
    if (!this.form.valid) {
      return;
    }
    let match = {
      appr_name: this.form.value.name,
      fmls_id: this.form.value.module_name,
      uscorg_id: this.orgID,
      cond_id: this.form.value.condition,
      table_name: this.table_name,
      table_value: this.form.value.table_value,
      equals: this.form.value.equals,
      select_value: this.form.value.field_name,
      approver_name:this.form.value.approver_name,
      aptype_id:this.form.value.role_name,
      checked1:this.form.value.checked1,
    };
    // this.router.navigate(["/admin/SelectModule", this.form.value.name]);

    this.adminService.createApproval(match).subscribe(
      (res: any) => {
        if (res.message == "Approval created successfully") {
          this.toaster.success(res.message);
          this.router.navigate(["/approvalFlow"]);
        } else {
          this.toaster.success("Something went wrong");
        }
      },
      (error: any) => {
        console.log();

        this.toaster.success(error.error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
