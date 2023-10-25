import { Component, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormArray,
  FormBuilder,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AdminService, AppService, ToasterService } from "src/app/_services";
import { CreateApproverComponent } from "../approver/create-approver.component";

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
  approver: any = [];
  fieldList: any;
  approvalCondition: any;
  selectedCondition: any;
  defaultCondition = 'On-Condition';
  formFields: any = [];
  formFieldValueData: any = [];
  formFieldsData: any;
  operatorList: any = ["=", ">", "<", "!=", "true", "false", "=="];
  orgID = 901;
  table_name: any;
  showRole: boolean = false;
  showUser: boolean = false;
  formData: any;
  moduleName: any;
  FieldName: any;
  tableValue: any;
  checked: boolean = false;
  condition1: any;
  private isChecked = false;
  form1!: FormGroup;
  addApprover: boolean = false;
  showApprover: boolean = false;
  checkModuleName:boolean=true;
  approverDataArray:any=[];
  // @Input() item: any;
  private subscription: Subscription = new Subscription();

  constructor(
    private toaster: ToasterService,
    private adminService: AdminService,
    private service: AppService,
    public router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      module_name: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      condition: new FormControl("", [Validators.required]),
      select_value: new FormControl("", [Validators.required]),
      equals: new FormControl("", [Validators.required]),
      table_value: new FormControl("", [Validators.required]),
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
 
  getfieldValue(data1: any) {
    this.formFieldValueData = data1.column_value;
    this.table_name = data1.table_name;
  }
  getFormID(data: any) { 
    this.formFields = [];
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

  getApproverList() {   
    this.adminService.getapprovalListDetails().subscribe((res: any) => {
      if (res.status) {
        this.approvalCondition = res.condition;
        this.approvalCondition.forEach((element:any) => {
          if(element.type == 'update')
          {
            element.checked = true;
          }
        });
      } else {
        this.toaster.error(res.message);
      }
    });
  }
  showApproverModal() {}

  onRadioChange(event: any) {
    
    // Get the selected value
    this.selectedCondition = event.type;
    if (this.selectedCondition == "On-Condition") {
      this.showModal = true;
    } else {
      this.showModal = false;
    }
  }
  // checkModuleNameList(){
  //   if(this.form.value.module_name != '')
  //   {
  //     this.checkModuleName = false;
  //   }
  //   else
  //   {
  //     this.checkModuleName = true;
  //     this.toaster.error("Please select Module Name");
  //   }
  // }
  submitForm(): void {
    
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
      select_value: this.form.value.select_value,
      approver: this.approverDataArray
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
  openApproverCreateDialog() {
    
    const dialogRef = this.dialog.open(CreateApproverComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
     
      this.approver = result;
      this.approver.forEach((element:any) => {
        this.approverDataArray.push({
          "level": element.levelstep,
          "user_id": element.user_id,
          "aptype_id":element.aptype_id
        })
      });
      console.log(this.approverDataArray);
    });

  }
}
