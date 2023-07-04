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
              <h2 mat-dialog-title class="m-0 text-white modal-title">Add New Field</h2>
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
                    <mat-select formControlName="column_type">
                      <mat-option value="text">Text</mat-option>
                      <mat-option value="number">Number</mat-option>
                      <mat-option value="select">Select</mat-option>
                    </mat-select>
                  </mat-form-field>
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
  form: FormGroup = new FormGroup({
    column_label: new FormControl('', [Validators.required]),
    column_type: new FormControl('', [Validators.required])
  });
  formID: any;

  constructor(private _mdr: MatDialogRef<AddFormFieldComponent>, @Inject(MAT_DIALOG_DATA) public data: number, private toaster: ToasterService) {
    this.formID = data;
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
    this._mdr.close(match);
  }
}
