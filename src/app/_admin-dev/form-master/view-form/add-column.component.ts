import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AdminService, ToasterService } from "src/app/_services";

@Component({
  selector: "app-add-form-column",
  template: `
    <section>
      <div class="container">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="row model">
            <div class="modal-header bg-primary" style="border-top:2px solid black;">
              <h2 mat-dialog-title class="m-0 text-white modal-title" *ngIf="form_type!='sub'">Add New Field</h2>
              <h2 mat-dialog-title class="m-0 text-white modal-title" *ngIf="form_type=='sub'">Add Field for sub form</h2>

              <button mat-icon-button (click)="closeDialog(false)" class="me-3" aria-label="Close"><mat-icon>close</mat-icon></button>
            </div>
            <div mat-dialog-content class="modal-body" style="height: max-content;">
              <div class="row px-2">
                <p class="d-grid gap-2 my-2">
                  <mat-form-field appearance="outline">
                  <mat-label>column_label</mat-label>
                    <input matInput placeholder="label" formControlName="column_label">
                  </mat-form-field>
                </p>
                <p class="d-grid gap-2 my-2">
                  <mat-form-field appearance="outline">
                    <mat-label>column_type</mat-label>
                    <mat-select formControlName="column_type" [(ngModel)]="fieldType" (selectionChange)="typeSelection($event)">
                      <mat-option value="text">Text</mat-option>
                      <mat-option value="number">Number</mat-option>
                      <mat-option value="radio">Radio Button</mat-option>

                      <mat-option value="select" *ngIf="form_type=='form'">Select</mat-option>
                      <mat-option value="assigndropdown" *ngIf="form_type=='form'">Group Dropdown</mat-option>

                    </mat-select>
                  </mat-form-field>
                </p>
                <p class="d-grid gap-2 my-2" *ngIf="(fieldType == 'select')?true:(fieldType == 'assigndropdown')?true:false">
                  <mat-checkbox formControlName="assingdrop" color="primary" (ngModelChange)="manualData = !manualData">do you want you save manual data for select dropdown?</mat-checkbox>
                </p>
                <!-- <p class="d-grid gap-2 my-2" *ngIf="((fieldType == 'select')?true:(fieldType == 'assigndropdown')?true:false) && !manualData">
                  <mat-form-field appearance="outline">
                    <mat-label>Table name</mat-label>
                    <mat-select formControlName="table_name" [(ngModel)]="tableName" (selectionChange)="getColumn(tableName)">
                      <mat-option>Select Table name</mat-option>
                      <mat-option value="usud">User Table</mat-option>
                    </mat-select>
                  </mat-form-field>
                </p> -->
                <p class="d-grid gap-2 my-2" *ngIf="tableName">
                  <mat-form-field appearance="outline">
                    <mat-label>Column name</mat-label>
                    <mat-select formControlName="column_name">
                      <mat-option>Select Column name</mat-option>
                      <mat-option value="first_name">First Name</mat-option>
                    </mat-select>
                  </mat-form-field>
                </p>
                <p class="d-grid gap-2 my-2" *ngIf="manualData">
                  <mat-form-field appearance="outline">
                    <mat-label>column_value</mat-label>
                    <textarea matInput placeholder="column_value" formControlName="column_value"></textarea>
                  </mat-form-field>
                </p>
             
                <!-- <p class="d-grid gap-2 my-2">
                  <mat-form-field appearance="outline">
                    <mat-label>position</mat-label>
                    <input matInput type="number" placeholder="position" formControlName="position">
                  </mat-form-field>
                </p> -->
                <p class="d-grid gap-2 my-2">
                  <mat-checkbox formControlName="mandatory" color="primary">Is this field required?</mat-checkbox>
                </p>
                <p class="d-grid gap-2 my-2">
              </p>
              </div>
            </div>
            <div mat-dialog-actions class="modal-footer" align="end" style="border-bottom:2px solid black;">
              <button type="submit" mat-flat-button color="primary">Submit</button>&nbsp;
              <button type="button" mat-stroked-button color="primary" (click)="closeDialog(false)">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </section>`
})
export class AddFormFieldComponent {
  tableName: any;
  manualData: boolean = false;
  form: FormGroup = new FormGroup({
    column_label: new FormControl(null, [Validators.required]),
    column_type: new FormControl(null, [Validators.required]),
    // position: new FormControl(null, [Validators.required]),
    mandatory: new FormControl(null),
    table_name: new FormControl(null),
    column_name: new FormControl(null),
    column_value: new FormControl(null),
    assingdrop:new FormControl(null),
    subform:new FormControl(null)

  });
  formID: any;
  fieldType: any;
  formData: any = {};
  form_type: any;

  constructor(private _mdr: MatDialogRef<AddFormFieldComponent>, @Inject(MAT_DIALOG_DATA) public data: number, private toaster: ToasterService, private adminService: AdminService) {
    this.formID = data;
    this.formData.fmls_id = this.formID.formid;
    this.form_type=this.formID.form_type
  }

  typeSelection(data:any): void {
    console.log(data.value);
    
    console.log(this.fieldType);
    if(data.value=="assigndropdown")
    {
      this.fieldType='assigndropdown'
    }
    this.formData.type = (this.fieldType == 'select')||(this.fieldType=="assigndropdown") ? 'dropdown' : 'addcolumn';
    if(data.value=="assigndropdown")
    {
      this.formData.type=data.value
      this.formData.module_title="Support Group"

    }else
    {

    }
    console.log(this.formData.type);
    
  }

  getColumn(tableName: any): void {
    console.log(tableName);
  }
  
  closeDialog(status: boolean) {
    this._mdr.close(status);
  }
  // getsubform(event:any)
  // {
  //   if(event==true)
  //   {
  //     this.formData.type="subform"
  //     this.formData.module_title="Contact info"
  //   }
  //   else
  //   {

  //   }
  // }
  
  onSubmit(): void {
    if(!this.form.valid) {
      this.toaster.warning("Please fill complete form");
      return;
    }
    console.log(this.form.value);
    
    let match: any = this.form.value;
    console.log(this.fieldType);
    if(this.form_type=="sub")
    {
      this.formData.type="subform"
          this.formData.module_title="Contact info"
    }
    else
    {

    }
    this.formData.columnDetail = [{ 
      "column_label": match.column_label, 
      "column_type": (this.fieldType == 'select' || this.fieldType == 'text' ||this.fieldType=="assigndropdown") ? 'text' : 'number',
      // "position": match.position,
      "mandatory": match.mandatory
    }];
    
    if((this.fieldType == 'select'||this.fieldType=="assigndropdown") && this.manualData) {
      this.formData.columnDetail[0].column_value = match.column_value.split(",");
    }
    console.log(this.formData);

    this.adminService.addColumnInForm(this.formData).subscribe((res: any) => {
      if(res.status == 201) {
        this._mdr.close(res.status == 201);
        this.toaster.success(res.message);
      } else {
        this.toaster.warning(res.message);
      }
      console.log(res);
      
    }, 
    
    (error: any) => {
      this.toaster.error(`${error.status} ${error.statusText}`);
    });
  }
  
}
