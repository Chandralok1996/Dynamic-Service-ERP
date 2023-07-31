import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "event-create",
  template: `
    <section>
      <div class="container">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="row">
            <div class="modal-header bg-primary" style="border-top:2px solid black; background-color: #3f51b5 !important; height: 4rem">
              <h2 mat-dialog-title class="text-white modal-title">Create Event</h2>
              <button mat-icon-button (click)="closeDialog(false)" class="me-3" aria-label="Close"><mat-icon>close</mat-icon></button>
            </div>
            <div mat-dialog-content class="modal-body" style="height: max-content;">
              <div class="row">
              </div>
            </div>
            <div mat-dialog-actions class="modal-footer" align="end" style="border-bottom:2px solid black;">
              <button type="submit" mat-flat-button color="primary" [disabled]="!form.valid">Create Event</button>&nbsp;
              <button type="button" mat-stroked-button color="primary" (click)="closeDialog(false)">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </section>`
})

export class EventCreateComponent {
  form: FormGroup = new FormGroup({
    gender:new FormControl('', [Validators.required]),
    first_name:new FormControl('', [Validators.required]),
    middle_name:new FormControl(''),
    last_name: new FormControl(''),
    phone_no:new FormControl('', [Validators.required]),
    date_of_birth:new FormControl('', [Validators.required]),
    permanent_address:new FormControl('', [Validators.required]),
    marital_status:new FormControl(''),
    title_headline:new FormControl('')
  });
  userData: any;

  constructor(private _mdr: MatDialogRef<EventCreateComponent>) {
  }

  closeDialog(status: boolean) {
    this._mdr.close(status);
  }

  onSubmit(): void {
   
  }
}
