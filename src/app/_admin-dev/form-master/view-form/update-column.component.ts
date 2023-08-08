import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AdminService, ToasterService } from "src/app/_services";

@Component({
  selector: "app-update-form-column",
  template: `
    <section>
      <div class="container">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="row model">
            <div class="modal-header bg-primary" style="border-top:2px solid black;">
              <h2 mat-dialog-title class="m-0 text-white modal-title">Update Field</h2>
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
                  <mat-checkbox formControlName="" (change)="checkrole($event)" color="primary">Read only?</mat-checkbox>
                </p>
                <p class="d-grid gap-2 my-2">
                <mat-form-field appearance="outline" style="width: 100%;" *ngIf="showrole">
                <mat-label>Role</mat-label>
                <mat-select [multiple]="true" formControlName="role">
                  <mat-option value="text">End User</mat-option>
                  <mat-option value="number">Developer</mat-option>
                  <mat-option value="number">Helpdesk</mat-option>
      
                  <mat-option value="number">Administrator</mat-option>

                </mat-select>
              </mat-form-field>
              </p>
                <p class="d-grid gap-2 my-2">
                  <mat-checkbox formControlName="mandatory" [checked]="mandatory" color="primary">Is this field required?</mat-checkbox>
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
export class UpdateFormFieldComponent {
  tableName: any;
  manualData: boolean = false;
  form: FormGroup = new FormGroup({
    column_label: new FormControl(null, [Validators.required]),
    position: new FormControl(null, [Validators.required]),
    mandatory: new FormControl(null)
  });
  formID: any;
  mandatory: boolean = false;
  fieldType: any;
  formData: any = {};
  showrole: boolean=false;

  constructor(private _mdr: MatDialogRef<UpdateFormFieldComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toaster: ToasterService, private adminService: AdminService) {
    this.formID = data;
    this.formData.fmmd_id = this.formID.fmmd_id;
  }
  ngAfterViewInit(): void {
    const dataMatch = {
      column_label: this.formID.column_label,
      position: this.formID.position,
      mandatory: !!this.formID.mandatory
    };
    this.mandatory = !!this.formID.mandatory
    this.form.patchValue(dataMatch);
  }

  closeDialog(status: boolean) {
    this._mdr.close(status);
  }
  
  onSubmit(): void {
    if(!this.form.valid) {
      this.toaster.warning("Please fill complete form");
      return;
    }
    let match: any = this.form.value;
    this.formData.column_label = match.column_label;
    this.formData.position = match.position;
    this.formData.mandatory = match.mandatory;
    this.adminService.updateColumnInForm(this.formData).subscribe((res: any) => {
      if(res.status == 200) {
        this._mdr.close(res.status == 200);
        this.toaster.success(res.message);
      } else {
        this.toaster.warning(res.message);
      }
    }, (error: any) => {
      this.toaster.error(`${error.status} ${error.statusText}`);
    });
  }
  checkrole(data:any)
  {
  if(data.checked==true)
  {
    this.showrole=true;
  }
    
  }
  
}
