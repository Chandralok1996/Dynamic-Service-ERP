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
import { DialogData } from "../update-approver/update-approver.component";

@Component({
  selector: "app-create-approver",
  templateUrl: "./create-approver.component.html",
  styleUrls: ["./create-approver.component.css"],
})
export class CreateApproverComponent {
  approvers: any[] = [];
  userData: any;
  result2: any = [];
  approverForm: any;
  isUpdate: boolean = false;
  approverList: any;
  approverRoleData: any;
  approverListData: any;
  approverTypeData: any;
  showRole: boolean = false;
  showUser: boolean = false;
  showApprover: boolean = false;
  enableAddApprover: boolean = true;
  dataSource: any;
  result: any;
  levelListData: any = [];
  levelData: any = [];
  pagination: any;
  approverArray: any;
  levelResultData: any = [];
  levelStep: any;
  approverData: any = [];
  result1:any=[];
  approvalDetails:any;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "level",
    "approver_type",
    "approver_name",
    "action",
  ];
  constructor(
    public dialogRef: MatDialogRef<CreateApproverComponent>,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private service: AppService,
    private toaster: ToasterService,
     @Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ) {}
  ngOnInit(): void {
    debugger
   // this.approvalDetails=this.dialogData.data;
   
    this.approverForm = new FormGroup({
      role_name: new FormControl("", [Validators.required]),
      approver_name: new FormControl("", [Validators.required]),
      level: new FormControl("", [Validators.required]),
    });
    //  if(this.approvalDetails.approver.length!=0){
    //   this.approverForm.value.role_name.type =this.approvalDetails.approver[0].type;
    // }
    this.getApproverList();
  }
  getApproverList() {
    this.approverRoleData = [];
    this.approverListData = [];
    this.approverTypeData = [];
    this.adminService.getapprovalListDetails().subscribe((res: any) => {
      if (res.status) {
        this.approverListData = res.approversList;
        this.levelListData = res.level;
        this.approverTypeData = res.type;
        this.approverRoleData = res.role;
      } else {
        this.toaster.error(res.message);
      }
    });
  }
  onSelectType(data1: any, index: any) {
    if (data1.type == "user") {
      this.showRole = false;
      this.showUser = true;
      if(this.approverData.length!=0)
      {
      this.approverList=this.approverList;
      }
      else
      {
        this.approverList = this.approverListData;
      }
      this.approverTypeData.splice(index + 1, 1);
    } else if (data1.type == "role") {
      this.showUser = false;
      this.showRole = true;
      if(this.approverData.length!=0)
      {
      this.approverList=this.approverList;
      }
      else
      {
        this.approverList = this.approverRoleData;
      }
    //  this.approverList = this.approverRoleData;
      if (index == 0) {
        this.approverTypeData.push(data1);
      }
      this.approverTypeData.splice(0, 1);
    }
  }

  get formCtrl() {
    return this.approverForm.controls;
  }
  addLevel() {
    debugger
    this.approverArray=null;
    if (this.approverForm.value.role_name.type == "user") {
      this.approverArray = {
        appr_id: null,
        apprv_id: null,
        column_label: null,
        column_name: null,
        emailid: null,
        fmmd_id: null,
        role_name: this.approverForm.value.role_name.type,
        approver_name: this.approverForm.value.approver_name.name,
        aptype_id: this.approverForm.value.role_name.aptype_id,
        user_id: this.approverForm.value.approver_name.user_id,
        levelstep: this.approverForm.value.level.level_name,
        levelId: this.approverForm.value.level.level,
      };
    } else if (this.approverForm.value.role_name.type == "role") {
      this.approverArray = {
        appr_id: null,
        apprv_id: null,
        column_label: null,
        column_name: null,
        emailid: null,
        fmmd_id: null,
        role_name: this.approverForm.value.role_name.type,
        aptype_id: this.approverForm.value.role_name.aptype_id,
        approver_name: this.approverForm.value.approver_name.usrlname,
        user_id: this.approverForm.value.approver_name.usrl_id,
        levelstep: this.approverForm.value.level.level_name,
        levelId: this.approverForm.value.level.level,
      };
    }

    this.approverData.push(this.approverArray);
    this.removeOption(this.approverArray.user_id,this.approverArray.aptype_id);

    if (this.approverData.length != 0) {
      this.showApprover = true;
      this.dataSource = new MatTableDataSource(this.approverData);
      this.enableAddApprover = false;
      this.approverForm.reset();
    } else {
      this.showApprover = false;
    }
  }
  removeOption(optionId: number,typeId:any): void {
    if(typeId=='5001')
    {
      this.approverList = this.approverList.filter((option:any) => option.user_id !== optionId);
    }
    else{
      this.approverList = this.approverList.filter((option:any) => option.usrl_id !== optionId); 
    }
  }
  // Remove a approver field from the form
  removeLevel(data:any,index: any) {
    debugger
    if(data.role_name == 'user')
    {
      this.approverListData.forEach((element:any) => {
        if(data.user_id == element.user_id)
        {
          this.approverList.push(element);
        }
      });
    }
    else if(data.role_name == 'role')
    {
      this.approverRoleData.forEach((element:any) => {
        if(data.user_id == element.usrl_id)
        {
          this.approverList.push(element);
        }
      });
    }
   
    this.dataSource.data.splice(index, 1);
    this.dataSource._data.next(this.dataSource.data);
    if (this.dataSource.data.length == 0) {
      this.enableAddApprover = true;
    } else {
      this.enableAddApprover = false;
    }
    // this.dataSource = new MatTableDataSource<Element>(data);
  }

  closeDialog(status: any) {
    this.dialogRef.close(status);
  }
  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.result = [];
    this.result1=[];
    this.result2 = [];
    if(this.approvalDetails==null){
      if (this.dataSource.data.length != 0) {
        this.dataSource.data.forEach((element: any) => {
          if (element.aptype_id == "5001") {
            this.result2.push({
              appr_id: null,
              apprv_id: null,
              column_label: null,
              column_name: null,
              emailid: null,
              fmmd_id: null,
              role_name: element.role_name,
              approver_name: element.approver_name,
              aptype_id: element.aptype_id,
              user_id: element.user_id,
              levelstep: element.levelstep,
              level: element.levelId,
            });
          } else {
            this.result2.push({
              appr_id: null,
              apprv_id: null,
              column_label: null,
              column_name: null,
              emailid: null,
              fmmd_id: null,
              role_name: element.role_name,
              aptype_id: element.aptype_id,
              approver_name: element.approver_name,
              user_id: element.user_id,
              levelstep: element.levelstep,
              level: element.levelId,
            });
          }
        });
      }
      else {
        this.toaster.error(
          "Something went wrong.Please contact to administrator"
        );
      }
    }
    else{
      if (this.dataSource.data.length != 0) {
        this.dataSource.data.forEach((element: any) => {
          if (element.aptype_id == "5001") {
            this.result2.push({
              appr_id: this.approvalDetails.appr_id,
              apprv_id:null,
              column_label: null,
              column_name:null,
              emailid:null,
              fmmd_id: null,
              role_name: element.role_name,
              approver_name: element.approver_name,
              aptype_id: element.aptype_id,
              user_id: element.user_id,
              levelstep: element.levelstep,
              level: element.levelId,
            });
          } else {
            this.result2.push({
              appr_id: this.approvalDetails.appr_id,
              apprv_id:null,
              column_label:null,
              column_name:null,
              emailid:null,
              fmmd_id:null,
              role_name: element.role_name,
              aptype_id: element.aptype_id,
              approver_name: element.approver_name,
              user_id: element.user_id,
              levelstep: element.levelstep,
              level: element.levelId,
            });
          }
        });
      }
      else {
        this.toaster.error(
          "Something went wrong.Please contact to administrator"
        );
      }
    }
  
    // if (this.result2.length != 0) {
    //   this.result2.forEach((element1: any,index2:any) => {
    //           if(this.result.length == 0) {
    //             this.result.push({
    //               levelID: element1.level,
    //               level: element1.levelstep,
    //               approverData:[{
    //                 name:element1.approver_name,
    //                 type:element1.role_name,
    //                 level:element1.level
    //               }]
    //             })
    //           } else if(this.result.length > 0) {   
    //               this.result.forEach((res:any,index:any) => {
    //                 if(res.levelID==element1.level)
    //                 {
    //                   res.levelID=res.levelID,
    //                   res.level= res.level,
    //                   res.approverData.push({
    //                     name:element1.approver_name,
    //                     type:element1.role_name,
    //                     level:element1.level
    //                   });
    //                 }
    //                 else if(res.levelID!=element1.level){
    //                   this.result.push({
    //                     levelID: element1.level,
    //                     level: element1.levelstep,
    //                     approverData:[{
    //                       name:element1.approver_name,
    //                       type:element1.role_name,
    //                       level:element1.level
    //                     }]
    //                   })
    //                 }
    //               })
                
    //           }        
    // // this.result1=this.result.filter((ele:any,index:any)=>ele.levelID===this.result.levelID)
        
    //         })
         console.log(this.result2)
    console.log(this.result1);
       if (this.result2.length != 0) {
      this.toaster.success("Approver is added successfully");
    } else {
      this.toaster.error(
        "Something went wrong.Please contact to administrator"
      );
    }
    this.closeDialog(this.result2);
      }
}
