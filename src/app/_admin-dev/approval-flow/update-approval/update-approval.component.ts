import {
  ChangeDetectorRef,
  Component,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormArray,
  FormBuilder,
} from "@angular/forms";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AdminService, AppService, ToasterService } from "src/app/_services";

import { MatTableDataSource } from "@angular/material/table";
import { UpdateApproverComponent } from "../approver/update-approver/update-approver.component";
import { MatPaginator } from "@angular/material/paginator";
import { CreateApproverComponent } from "../approver/create-approver/create-approver.component";
import { MatSort } from "@angular/material/sort";

export interface approverData {
  level: any;
  approverData?: approver[] | MatTableDataSource<approver>;
}

export interface approver {
  name: string;
  type: string;
  action: any;
}

export interface ApproverDataSource {
  name: string;
  type: string;
  action: any;
  approverData?: MatTableDataSource<approver>;
}
@Component({
  selector: "app-update-approval",
  templateUrl: "./update-approval.component.html",
  styleUrls: ["./update-approval.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
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
  approverResult: approverData[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("outerSort", { static: true }) sort: any;
  @ViewChildren("innerSort") innerSort: any;
  @ViewChildren("innerTables") innerTables: any;

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
  tableData: any = [];
  showApprover: boolean = false;
  checkModuleName: boolean = true;
  approverDataArray: any = [];
  approvalListDetailsData: any;
  paramData: any;
  apprID: any;
  user: any;
  columnValue: any = [];
  dataSource: any;
  pagination: any;
  approverData: any = [];
  updatedData: any;
  approverRow: any;
  levelAccordingData: any = [];
  levelData: any = [];
  deletedApproverData: any;
  ApproverData1: any = [];
  approverUpdateDataArray: any = [];
  data: any;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "level",
    "approver_type",
    "approver_name",
    "action",
  ];
  // @Input() item: any;
  private subscription: Subscription = new Subscription();
  //columnsToDisplay = ["Level"];
  //  innerDisplayedColumns = ["Sr", "Name", "Type", "Action"];
  expandedElement: any | null;
  levelDetailData: any = [];
  constructor(
    private toaster: ToasterService,
    private adminService: AdminService,
    private service: AppService,
    public router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.pagination = this.service.pagination;
  }

  ngOnInit(): void {
    this.paramData = this.route.snapshot.params;
    this.apprID = this.paramData.id;
    this.getFormModuleList();
    this.getApproverList();
    this.getApproverListDetails(this.apprID);
    this.form = new FormGroup({
      module_name: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      condition: new FormControl("", [Validators.required]),
    });
  }
  getApproverListDetails(id: any) {
    ;
    this.ApproverData1 = [];
    var a = this.adminService.getApprovaldetails(id).subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.approvalListDetailsData = res.result[0];
        this.form.patchValue({
          condition: this.approvalListDetailsData.cond_id,
          // condt_id: this.approvalListDetailsData.condt_id,
          name: this.approvalListDetailsData.appr_name,

          module_name: this.approvalListDetailsData.fmls_id,
          // org: this.approvalListDetailsData.org,

          // table_name: this.approvalListDetailsData.table_name,

          // type: this.approvalListDetailsData.type,
          // uscorg_id: this.approvalListDetailsData.uscorg_id,
        });
        this.ApproverData1 = this.approvalListDetailsData.approver;
        this.dataSource = new MatTableDataSource(this.ApproverData1);
        if (this.form.value.condition == "1002") {
          this.showModal = true;
          this.checkType(this.approvalListDetailsData.type);
          this.form.patchValue({
            equals: this.approvalListDetailsData.equals,
            select_value: this.approvalListDetailsData.select_value,
            table_value: this.approvalListDetailsData.table_value,
          });
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
  // toggleRow(element: any) {

  //   element.approverData
  //     ? (this.expandedElement =
  //         this.expandedElement === element ? null : element)
  //     : null;
  //   this.cd.detectChanges();
  //   this.innerTables.forEach(
  //     (table: any, index: any) =>
  //       ((table.dataSource as MatTableDataSource<approver>).sort =
  //         this.innerSort.toArray()[index])
  //   );
  // }

  applyFilter(filterValue: string) {
    this.innerTables.forEach(
      (table: any, index: any) =>
        ((table.dataSource as MatTableDataSource<approver>).filter = filterValue
          .trim()
          .toLowerCase())
    );
  }
  // getfieldValue(data1: any) {
  //   this.formFieldValueData = data1.column_value;
  //   this.table_name = data1.table_name;
  // }
  getfieldValueOnupdate(dataValue: any) {
    
    this.formFieldValueData = [];
    this.table_name = dataValue.table_name;
    this.columnValue = dataValue.column_value;
    this.formFieldValueData = dataValue.column_value;
    this.columnValue.forEach((element: any) => {
      if (element.id == this.form.value.select_value) {
        this.formFieldValueData.push(element);
      } else {
        this.form.value.select_value = null;
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
        this.approvalCondition.forEach((element: any, index: any) => {
          if (element.type == "update") {
            return this.approvalCondition.splice(index, 1);
          }
        });
      } else {
        this.toaster.error(res.message);
      }
    });
  }
  showApproverModal() {}
  checkType(type: any) {
    if (type == "On-Condition") {
      this.showModal = true;
      this.form.addControl(
        "select_value",
        new FormControl("", Validators.required)
      );
      this.form.addControl(
        "table_value",
        new FormControl("", Validators.required)
      );
      this.form.addControl("equals", new FormControl("", Validators.required));
    } else {
      this.showModal = false;
      this.form.removeControl(
        "select_value",
        new FormControl("", Validators.required)
      );
      this.form.removeControl(
        "table_value",
        new FormControl("", Validators.required)
      );
      this.form.removeControl(
        "equals",
        new FormControl("", Validators.required)
      );
    }
  }
  onRadioChange(event: any) {
    // Get the selected value
    this.selectedCondition = event.type;
    if (this.selectedCondition == "On-Condition") {
      this.showModal = true;
      this.form.addControl(
        "select_value",
        new FormControl("", Validators.required)
      );
      this.form.addControl(
        "table_value",
        new FormControl("", Validators.required)
      );
      this.form.addControl("equals", new FormControl("", Validators.required));
    } else if (this.selectedCondition == "create") {
      this.showModal = false;
      this.form.removeControl(
        "select_value",
        new FormControl("", Validators.required)
      );
      this.form.removeControl(
        "table_value",
        new FormControl("", Validators.required)
      );
      this.form.removeControl(
        "equals",
        new FormControl("", Validators.required)
      );
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
  submitForm() {
    if (this.form.invalid) {
      return;
    }
    let match = {
      appr_id: this.approvalListDetailsData.appr_id,
      appr_name: this.form.value.name,
      fmls_id: this.form.value.module_name,
      uscorg_id: null,
      condt_id:this.approvalListDetailsData.condt_id,
      cond_id: this.form.value.condition,
      table_name: this.table_name,
      table_value: this.form.value.table_value,
      equals: this.form.value.equals,
      select_value: this.form.value.select_value,
      approver: this.approvalListDetailsData.approver,
    };
    // this.router.navigate(["/admin/SelectModule", this.form.value.name]);

    this.adminService.updateApproval(match).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.toaster.success(res.message);
          this.router.navigate(["/admin/approvalFlow"]);
        } else {
          this.toaster.error("Something went wrong");
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
  removeApprover(data: any, index: any) {
    var apprv_id = data.apprv_id;

    var a = this.adminService.deleteApprover(apprv_id).subscribe((res: any) => {
      if (res.status == 200) {
        this.dataSource.data.splice(index, 1);
        this.getApproverListDetails(this.apprID);
        this.dataSource._data.next(this.ApproverData1);
        this.toaster.success("Approver is deleted successfully.");
      } else {
        this.toaster.error(
          "Something went wrong,Please contact to your administrator"
        );
      }
    });

    // this.approvalListDetailsData.approver.push(this.approverRow);
  }

  openApproverCreatedDialog() {
    const dialogUpdatedRef = this.dialog.open(CreateApproverComponent, {
      disableClose: true,
      data: { data: this.approvalListDetailsData },
    });

    dialogUpdatedRef.afterClosed().subscribe((result2: any) => {
      this.approver = [];
      this.approverUpdateDataArray = [];
      this.approverUpdateDataArray = result2;
      if (this.approverUpdateDataArray.length != 0) {
        this.approverUpdateDataArray.forEach((element: any) => {
          this.ApproverData1.push({
            appr_id: element.appr_id,
            apprv_id: element.apprv_id,
            aptype_id: element.aptype_id,
            column_label: element.column_label,
            column_name: element.column_name,
            emailid: element.emailid,
            fmmd_id: element.fmmd_id,
            level: element.level,
            level_name: element.levelstep,
            name: element.approver_name,
            type: element.role_name,
            user_id: element.user_id,
          });
        });
        this.dataSource._data.next(this.ApproverData1);
      }

      // if(this.approver.length != 0)
      // {

      //   this.approver.forEach((user: any) => {
      //     user.approverData.forEach((element: any) => {
      //       if(user.levelID==1)
      //       {
      //         this.levelDetailData=[{
      //           level:user.level,
      //           approverData:user.approverData
      //         }];
      //       }
      //       else if(user.levelID==2){
      //         this.levelDetailData.push({
      //           level:user.level,
      //           approverData:user.approverData

      //         });
      //       }
      //       else if(user.levelID==3){
      //         this.levelDetailData.push({
      //           level:user.level,
      //           approverData:user.approverData

      //         });
      //       }
      //       else if(user.levelID==4){
      //         this.levelDetailData.push({
      //           level:user.level,
      //           approverData:user.approverData
      //         });
      //       }
      //       else if(user.levelID==5){
      //         this.levelDetailData.push({
      //           level:user.level,
      //           approverData:user.approverData

      //         });
      //       }
      //     });
      //   });

      //   // this.approverData=this.approver[0].levelResultData;
      //   // this.approverResult.forEach((user:any) => {
      //   //   if (user.levelResultData && Array.isArray(user.levelResultData) && user.levelResultData.length) {
      //   //     this.levelData = [...this.levelData, {...user, approverData: new MatTableDataSource(user.levelResultData)}];
      //   //   } else {
      //   //     this.levelData = [...this.levelData, user];
      //   //   }
      //   //   this.levelData={...user,approverData: new MatTableDataSource(user.levelResultData)};
      //   // });
      //   this.dataSource = new MatTableDataSource(this.levelDetailData);
      //   this.dataSource.sort = this.sort;
      // }
      // this.approver.forEach((element: any) => {
      //   if(element.role_name == 'user')
      //   {
      //     this.approverUpdateDataArray.push({
      //       level: element.levelstep,
      //       type: element.role_name,
      //       name: element.approver_name,
      //       user_id: element.user_id,
      //       usrl_id:null,
      //       usrlname:null,
      //       aptype_id: element.aptype_id,
      //       appr_id: null,
      //       apprv_id: null,
      //       column_label: null,
      //       column_name: null,
      //       emailid:null,
      //       fmmd_id: null,
      //     });
      //   }
      //   else{
      //     this.approverUpdateDataArray.push({
      //       level: element.levelstep,
      //       type: element.role_name,
      //       user_id:null,
      //       usrlname: element.approver_name,
      //       name:null,
      //       usrl_id: element.user_id,
      //       aptype_id: element.aptype_id,
      //       appr_id: null,
      //       apprv_id: null,
      //       column_label: null,
      //       column_name: null,
      //       emailid:null,
      //       fmmd_id: null,
      //     });
      //   }

      // });

      // this.approverUpdateDataArray.forEach((element:any) => {
      //   const match:any= {};
      //   match.level = this.dataSource.data.length+1;
      //   match.type=element.type;
      //   match.name=element.name;
      //   match.user_id=element.user_id;
      //   match.usrl_id=element.usrl_id;
      //   match.astype_id=element.aptype_id;
      //   match.type=element.type;
      //   match.usrlname=element.usrlname;
      //   match.appr_id=element.appr_id;
      //   match.apprv_id=element.apprv_id;
      //   match.column_label=element.column_label;
      //   match.column_name=element.column_name;
      //   match.emailid=element.emailid;
      //   match.fmmd_id=element.fmmd_id;
      //   this.approvalListDetailsData.approver.push(match);
      // this.dataSource = new MatTableDataSource(this.approvalListDetailsData.approver);
      // });
    });
  }

  openApproverUpdateDialog(approverData: any, index: any) {
    const dialogRef = this.dialog.open(UpdateApproverComponent, {
      disableClose: true,
      data: { data: approverData, id: index },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.getApproverListDetails(result);
    });
  }
}
