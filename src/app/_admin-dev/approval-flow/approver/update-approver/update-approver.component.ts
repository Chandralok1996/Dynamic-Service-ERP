import { Component, Inject, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AdminService, AppService, ToasterService } from "src/app/_services";

export interface DialogData {
  data: string;
}
@Component({
  selector: "app-update-approver",
  templateUrl: "./update-approver.component.html",
  styleUrls: ["./update-approver.component.css"],
})
export class UpdateApproverComponent {
  approvers: any[] = [];
  userData: any;
  approverForm: any;
  isUpdate: boolean = false;
  approverList: any;
  approverRoleData: any;
  approverListData: any;
  approverTypeData: any;
  showRole: boolean = false;
  showUser: boolean = false;
  showApprover: boolean = false;
  dataSource: any;
  pagination: any;
  approverArray: any;
  levelStep = 0;
  result1: any = [];
  approverData: any = [];
  enableUpdateApprover: boolean = true;
  index1: any;
  typeIndex:any;
  apprID:any;
  match:any;
  approverDataDetails: any;
  levelListData:any;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "sr",
    "approver_type",
    "approver_name",
    "action",
  ];
  constructor(
    private _mdr: MatDialogRef<UpdateApproverComponent>,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private service: AppService,
    private toaster: ToasterService,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ) {}
  ngOnInit(): void {
    ;
    this.approverData = this.dialogData;
    this.approverDataDetails = this.approverData.data;
    this.index1 = this.approverData.id;
    if(this.approverDataDetails.type=='user')
    {
      this.typeIndex=0;
    }
    else{
      this.typeIndex=1;
    }
    this.approverForm = new FormGroup({
      role_name: new FormControl("", [Validators.required]),
      approver_name: new FormControl("", [Validators.required]),
      name: new FormControl(""),
      type: new FormControl(""),
      index: new FormControl(""),
      level: new FormControl(""),
    });
    this.getApproverList();
  }

  // patchApproverFormData(){
  //   this.approverForm.patchValue({
  //     role_name:this.approverData.aptype_id,
  //     approver_name:this.approverData.user_id
  //   });
  //}
  getApproverList() {
    
    this.adminService.getapprovalListDetails().subscribe((res: any) => {
      if (res.status == 200) {
        this.approverListData = res.approversList;
        this.levelListData = res.level;
        this.approverTypeData = res.type;
        this.approverRoleData = res.role;
        this.onSelectApproverType(this.approverDataDetails,this.typeIndex);
      } else {
        this.toaster.error(res.message);
      }
    });
  }

  onSelectApproverType(data1: any, index: any) {
    ;
    if (data1.type == "user") {
      this.showRole = false;
      this.showUser = true;

      this.approverForm.patchValue({
        role_name: data1.aptype_id,
        approver_name: data1.user_id,
        name: data1.name,
        type: data1.type,
        index: index,
        level:data1.level
      });
      this.approverList = this.approverListData;
      this.approverTypeData.splice(index + 1, 1);
    } else if (data1.type == "role") {
      this.showUser = false;
      this.showRole = true;
      this.approverForm.patchValue({
        role_name: data1.aptype_id,
        approver_name: data1.usrl_id,
        name: data1.usrlname,
        type: data1.type,
        index: index,
        level:data1.level
      });
      this.approverList = this.approverRoleData;
      if (index == 0) {
        this.approverTypeData.push(data1);
      }
      this.approverTypeData.splice(0, 1);
    }
  }
  // onSelectType(data1: any,index:any) {

  //   if (data1.type == "user") {
  //     this.showRole = false;
  //     this.showUser = true;
  //     this.approverList = this.approverListData;
  //     this.approverTypeData.splice(index+1,1);
  //   } else if (data1.type == "role") {
  //     this.showUser = false;
  //     this.showRole = true;
  //     this.approverList = this.approverRoleData;
  //     if(index == 0)
  //     {
  //       this.approverTypeData.push(data1);
  //     }
  //     this.approverTypeData.splice(0,1);
  //   }
  // }
  onChangeUser(data3: any) {
    if (data3.aptype_id == 5001) {
      this.approverForm.value.name = data3.name;
    } else if (data3.aptype_id == 5002) {
      this.approverForm.value.name = data3.name;
    }
  }
  get formCtrl() {
    return this.approverForm.controls;
  }
  // addLevel() {
  // if (this.approverForm.value.role_name.type == "user") {
  //     this.approverArray = {
  //       role_name: this.approverForm.value.role_name.type,
  //       approver_name: this.approverForm.value.approver_name.name,
  //       aptype_id: this.approverForm.value.role_name.aptype_id,
  //       user_id: this.approverForm.value.approver_name.user_id,
  //       levelstep:this.approverData.length + 1
  //     };
  //   } else if (this.approverForm.value.role_name.type == "role") {
  //     this.approverArray = {
  //       role_name: this.approverForm.value.role_name.type,
  //       aptype_id: this.approverForm.value.role_name.aptype_id,
  //       approver_name: this.approverForm.value.approver_name.usrlname,
  //       user_id: this.approverForm.value.approver_name.usrl_id,
  //       levelstep:this.approverData.length + 1
  //     };
  //   }

  //   this.approverData.push(this.approverArray);
  //   if (this.approverData.length != 0) {
  //     this.showApprover = true;
  //     this.dataSource = new MatTableDataSource(this.approverData);
  //     this.enableAddApprover = false;
  //     this.approverForm.reset();
  //   } else {
  //     this.showApprover = false;
  //   }
  // }

  // Remove a approver field from the form
  // removeLevel(index:any) {

  //   this.dataSource.data.splice(index,1);
  //   this.dataSource._data.next(this.dataSource.data);
  //   if(this.dataSource.data.length == 0)
  //   {
  //       this.enableAddApprover = true;
  //   }
  //   else{
  //       this.enableAddApprover =false;
  //   }

  // }

  closeDialog(status: boolean) {
    this._mdr.close(status);
  }

  onSubmit() {
    ;
    if (this.approverForm.invalid) {
      return;
    }
    if(this.approverForm.value.type == 'user')
    {
      this.match = {
    
        apprv_id:this.approverDataDetails.apprv_id,
        appr_id: this.approverDataDetails.appr_id,
        aptype_id:this.approverForm.value.role_name,
        user_id:this.approverForm.value.approver_name,
        usrl_id:null,
        fmmd_id:null,
        column_name:null,
        column_label:null,
        level:this.approverForm.value.level
    
    }
    }
    else{
      this.match = {
    
        apprv_id:this.approverDataDetails.apprv_id,
        appr_id: this.approverDataDetails.appr_id,
        aptype_id:this.approverForm.value.role_name,
        user_id:null,
        usrl_id:this.approverForm.value.approver_name,
        fmmd_id:null,
        column_name:null,
        column_label:null,
        level:this.approverDataDetails.level
    
    }
    }
   
    this.adminService.updateApprover(this.match).subscribe((res: any) => {
      if(res.status == 200) {
        this.toaster.success(res.message);
        this.apprID =this.match.appr_id;
        this.closeDialog(this.apprID);
      } else {
        this.toaster.warning(res.message);
      }
    }, (error: any) => {
      this.toaster.error(`${error.status} ${error.statusText}`);
    });
  }
  onNoClick() {
    this._mdr.close();
  }
}
