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
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AdminService, AppService, ToasterService } from "src/app/_services";
import { CreateApproverComponent } from "../approver/create-approver.component";
import { MatTableDataSource } from "@angular/material/table";
import { UpdateApproverComponent } from "../approver/update-approver/update-approver.component";

@Component({
  selector: "app-update-approval",
  templateUrl: "./update-approval.component.html",
  styleUrls: ["./update-approval.component.css"],
})
export class UpdateApprovalComponent {
  showPass: boolean = true;
  form: any;
  showModal: boolean = false;
  approvalDetails: any[] = [];
  modulelist: any;
  approver: any = [];
  fieldList: any;
  approvalCondition: any;
  selectedCondition: any;
  defaultCondition = "On-Condition";
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
  tableData:any=[];
  private isChecked = false;
  form1!: FormGroup;
  showApprover: boolean = false;
  checkModuleName: boolean = true;
  approverDataArray: any = [];
  approvalListDetailsData: any;
  paramData: any;
  apprID: any;
  user:any;
  columnValue: any = [];
  dataSource: any;
  pagination: any;
  approverData: any = [];
  updatedData:any;
  approverRow:any;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  copyDisplayColumn: string[] = ["sr", "Approver_Name", "Approver_Type","action"];
  // @Input() item: any;
  private subscription: Subscription = new Subscription();

  constructor(
    private toaster: ToasterService,
    private adminService: AdminService,
    private service: AppService,
    public router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramData = this.route.snapshot.params;
    this.apprID = this.paramData.id;
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
    this.getApproverListDetails(this.apprID);
  }
  getApproverListDetails(id: any) {
    var a = this.adminService.getApprovaldetails(id).subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.approvalListDetailsData = res.result[0];
        this.form.patchValue({
          condition: this.approvalListDetailsData.cond_id,
          condt_id: this.approvalListDetailsData.condt_id,
          name: this.approvalListDetailsData.appr_name,
          equals: this.approvalListDetailsData.equals,
          module_name: this.approvalListDetailsData.fmls_id,
          org: this.approvalListDetailsData.org,
          select_value: this.approvalListDetailsData.select_value,
          table_name: this.approvalListDetailsData.table_name,
          table_value: this.approvalListDetailsData.table_value,
          type: this.approvalListDetailsData.type,
          uscorg_id: this.approvalListDetailsData.uscorg_id,
        });
        this.dataSource = new MatTableDataSource(this.approvalListDetailsData.approver);
        if (this.form.value.condition == "1002") {
          this.showModal = true;
        } else {
          this.showModal = false;
        }
        this.getFormByID(this.approvalListDetailsData.fmls_id);
        //this.getfieldValue()
      } else {
        this.toaster.error(
          "Something went wrong,Please contact to your administrator"
        );
      }
      setTimeout(() => {
        if (res.status == 200) {
          // this.form.value.table_value=
        }
      }, 300);
    });
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

  // getfieldValue(data1: any) {
  //   this.formFieldValueData = data1.column_value;
  //   this.table_name = data1.table_name;
  // }
  getfieldValueOnupdate(dataValue: any) {
    debugger;
    this.table_name = dataValue.table_name;
    this.columnValue = dataValue.column_value;
    this.columnValue.forEach((element: any) => {
      if (element.id == this.form.value.select_value) {
        this.formFieldValueData.push(element);
      } else {
        this.formFieldValueData = dataValue.column_value;
        this.table_name = dataValue.table_name;
      }
    });
  }
  // getFormID(data: any) {
  //   this.formFields = [];
  //   this.adminService.getFormByID(data.fmls_id).subscribe((res: any) => {
  //     if (res.status == 200) {
  //       this.formFieldsData = res.rows;
  //       this.formFieldsData.forEach((element: any) => {
  //         if (element.type == "assigndropdown" || element.type == "dropdown") {
  //           this.formFields.push(element);
  //         }
  //       });
  //     } else {
  //       this.toaster.error(res.message);
  //     }
  //   });
  // }
  getFormByID(data: any) {
    debugger;
    this.formFields = [];
    this.adminService.getFormByID(data).subscribe((res: any) => {
      if (res.status == 200) {
        this.formFieldsData = res.rows;
        this.formFieldsData.forEach((element: any) => {
          if (element.type == "assigndropdown" || element.type == "dropdown") {
            if (element.column_label == this.form.value.table_value) {
              this.formFields.push(element);
              this.getfieldValueOnupdate(element);
            } else {
              this.formFields.push(element);
              this.getfieldValueOnupdate(element);
            }
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
        this.approvalCondition.forEach((element: any) => {
          if (element.type == "update") {
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
      approver: this.approverDataArray,
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
  removeLevel(data:any,index:any)
  {
    debugger
    this.dataSource.data.splice(index,1);
    this.dataSource._data.next(this.dataSource.data);
    data.flag = true;
    this.approverRow = data;
    this.toaster.success("Approver is deleted successfully");
  }

  openApproverCreateDialog() {
    debugger
    const dialogRef = this.dialog.open(CreateApproverComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.approver = result;
      this.approver.forEach((element: any) => {
        this.approverDataArray.push({
          level: element.levelstep,
          name: element.user_id,
          type: element.aptype_id
        });
      });
      console.log(this.approverDataArray);
     //this.dataSource = new MatTableDataSource(this.approverDataArray);
     this.dataSource.data.push(this.approverDataArray);
    });
  }

  openApproverUpdateDialog(approverData:any,index:any) {
    debugger
    const dialogRef = this.dialog.open(UpdateApproverComponent, {
      disableClose: true,
      data: { data: approverData,
        id:index },
    });

    dialogRef.afterClosed().subscribe((result) => {
     debugger
     console.log(result);
     this.getApproverListDetails(result);
    });

  }
}
