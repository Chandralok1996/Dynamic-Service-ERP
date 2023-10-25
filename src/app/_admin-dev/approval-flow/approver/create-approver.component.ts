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

@Component({
  selector: "event-create",
  template: ` <style>
      .mat-mdc-unelevated-button > .mat-icon {
        margin-right: 0px;
      }
      .mat-mdc-header-row {
        background: #3f51b5;
      }
      th {
        color: white !important;
      }
    </style>
    <section>
      <div class="container">
        <div>
          <div class="row">
            <div
              class="modal-header bg-primary"
              style="border-top:2px solid black; background-color: #3f51b5 !important; height: 4rem"
            >
              <h2 mat-dialog-title class="text-white modal-title">
                Add New Approver
              </h2>
              <button
                mat-icon-button
                (click)="closeDialog(false)"
                class="me-3"
                aria-label="Close"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>
            <div
              mat-dialog-content
              class="modal-body"
              style="height: max-content;"
            >
              <form [formGroup]="approverForm">
                <div>
                  <div class="row">
                    <div class="col-4">
                      <mat-form-field>
                        <mat-label>Select Type</mat-label>
                        <mat-select matInput formControlName="role_name">
                          <mat-option
                            *ngFor="let role of approverTypeData;let i=index;"
                            (click)="onSelectType(role,i)"
                            [value]="role"
                          >
                            {{ role.type }}
                          </mat-option>
                        </mat-select>
                        <mat-error
                          class="mb-4"
                          *ngIf="formCtrl.role_name.errors?.required"
                          >Type is required</mat-error
                        >
                      </mat-form-field>
                    </div>
                    <div class="col-md-5" *ngIf="showUser">
                      <mat-form-field>
                        <mat-label>Select Approver Name</mat-label>
                        <mat-select matInput formControlName="approver_name">
                          <mat-option
                            *ngFor="let approver of approverList"
                            [value]="approver"
                          >
                            {{ approver.name }}
                          </mat-option>
                        </mat-select>
                        <mat-error
                          class="mb-4"
                          *ngIf="formCtrl.approver_name.errors?.required"
                          >Approver name is required</mat-error
                        >
                      </mat-form-field>
                    </div>
                    <div class="col-md-5" *ngIf="showRole">
                      <mat-form-field>
                        <mat-label>Select Approver Name</mat-label>
                        <mat-select matInput formControlName="approver_name">
                          <mat-option
                            *ngFor="let approver of approverList"
                            [value]="approver"
                          >
                            {{ approver.usrlname }}
                          </mat-option>
                        </mat-select>
                        <mat-error
                          class="mb-4"
                          *ngIf="formCtrl.approver_name.errors?.required"
                          >Approver name is required</mat-error>
                      </mat-form-field>
                    </div>
                  &nbsp; &nbsp;
                    <div class="col-2 mt-2">
                      <button
                        *ngIf="!isUpdate"
                        type="button"
                        mat-flat-button
                        color="primary"
                        [disabled]="approverForm.invalid"
                        (click)="addLevel()"
                      >
                        <mat-icon style="float: left;">add</mat-icon></button
                      >
                    </div>
                  </div>
                  <div class="row my-2" *ngIf="showApprover">
                    <div class="card p-2 shadow">
                      <div>
                        <table mat-table [dataSource]="dataSource" tabindex="0" style="overflow-y: scroll;">
                          <ng-container matColumnDef="sr">
                            <th mat-header-cell *matHeaderCellDef>Level</th>
                            <td
                              mat-cell
                              *matCellDef="let element; let i = index"
                            >
                            {{element.levelstep}}
                            </td>
                          </ng-container>
                          <ng-container matColumnDef="approver_type">
                            <th mat-header-cell *matHeaderCellDef>
                              Approver Type
                            </th>
                            <td mat-cell *matCellDef="let element">
                              {{ element.role_name }}
                            </td>
                          </ng-container>
                          <ng-container matColumnDef="approver_name">
                            <th mat-header-cell *matHeaderCellDef>
                              Approver Name
                            </th>
                            <td mat-cell *matCellDef="let element">
                              {{ element.approver_name }}
                            </td>
                          </ng-container>
                          <ng-container matColumnDef="action">
                          <th mat-header-cell *matHeaderCellDef> Action </th>
                          <td mat-cell *matCellDef="let row let i = index;">
                            <button type="button" mat-mini-fab color="primary" (click)="removeLevel(i)"><mat-icon>delete</mat-icon></button>
                        </td>
                        </ng-container>
                          <tr
                            mat-header-row
                            *matHeaderRowDef="displayedColumns; sticky: true"
                          ></tr>
                          <tr
                            mat-row
                            *matRowDef="let row; columns: displayedColumns"
                          ></tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        mat-dialog-actions
        class="modal-footer"
        align="end"
        style="border-bottom:2px solid black;"
      >
        <button type="submit" (click)="onSubmit()" [disabled]="enableAddApprover" mat-flat-button color="primary">
          Add Approver</button
        >&nbsp;
        <button
          type="button"
          mat-stroked-button
          color="primary"
          (click)="closeDialog(false)"
        >
          Cancel
        </button>
      </div>
    </section>`,
})
export class CreateApproverComponent implements OnInit {
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
  enableAddApprover: boolean = true;
  dataSource: any;
  pagination: any;
  approverArray: any;
  levelStep=0;
  approverData: any = [];
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ["sr", "approver_type", "approver_name","action"];
  constructor(
    private _mdr: MatDialogRef<CreateApproverComponent>,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private service: AppService,
    private toaster: ToasterService
  ) {}
  ngOnInit(): void {
    ;
    this.approverForm = new FormGroup({
      role_name: new FormControl("", [Validators.required]),
      approver_name: new FormControl("", [Validators.required]),
    });
    this.getApproverList();
  }
  getApproverList() {
    this.adminService.getapprovalListDetails().subscribe((res: any) => {
      if (res.status) {
        this.approverListData = res.approversList;
        this.approverTypeData = res.type;
        this.approverRoleData = res.role;
      } else {
        this.toaster.error(res.message);
      }
    });
  }
  onSelectType(data1: any,index:any) {
    
    if (data1.type == "user") {
      this.showRole = false;
      this.showUser = true;
      this.approverList = this.approverListData;
      this.approverTypeData.splice(index+1,1);
    } else if (data1.type == "role") {
      this.showUser = false;
      this.showRole = true;
      this.approverList = this.approverRoleData;
      if(index == 0)
      {
        this.approverTypeData.push(data1);
      }
      this.approverTypeData.splice(0,1);
    }
  }

  get formCtrl() {
    return this.approverForm.controls;
  }
  addLevel() {
  if (this.approverForm.value.role_name.type == "user") {
      this.approverArray = {
        role_name: this.approverForm.value.role_name.type,
        approver_name: this.approverForm.value.approver_name.name,
        aptype_id: this.approverForm.value.role_name.aptype_id,
        user_id: this.approverForm.value.approver_name.user_id,
        levelstep:this.approverData.length + 1
      };
    } else if (this.approverForm.value.role_name.type == "role") {
      this.approverArray = {
        role_name: this.approverForm.value.role_name.type,
        aptype_id: this.approverForm.value.role_name.aptype_id,
        approver_name: this.approverForm.value.approver_name.usrlname,
        user_id: this.approverForm.value.approver_name.usrl_id,
        levelstep:this.approverData.length + 1
      };
    }

    this.approverData.push(this.approverArray);
    if (this.approverData.length != 0) {
      this.showApprover = true;
      this.dataSource = new MatTableDataSource(this.approverData);
      this.enableAddApprover = false;
      this.approverForm.reset();
    } else {
      this.showApprover = false;
    }
  }

  // Remove a approver field from the form
  removeLevel(index:any) {
    
    this.dataSource.data.splice(index,1);
    this.dataSource._data.next(this.dataSource.data);
    if(this.dataSource.data.length == 0)
    {
        this.enableAddApprover = true;
    }
    else{
        this.enableAddApprover =false;
    }
     // this.dataSource = new MatTableDataSource<Element>(data);
  }

  closeDialog(status: boolean) {
    this._mdr.close(status);
  }

  onSubmit() {
    
    this.closeDialog(this.dataSource.data);
    if(this.dataSource.data.length != 0){
        this.toaster.success("Approver is added successfully");
    }
    else{
        this.toaster.error("Something went wrong.Please contact to administrator");
    }
  }
}
