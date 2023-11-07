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
            <mat-progress-spinner style="height: 40px; width: 25px;"
                class="example-margin"
                color="primary"
                mode="indeterminate"
                value="50">
            </mat-progress-spinner>
          </div>
    </section>`,
})
export class LoadingComponent implements OnInit {

    constructor(
        private _mdr: MatDialogRef<LoadingComponent>,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private service: AppService,
        private toaster: ToasterService
    ) { }
    ngOnInit(): void {
        setTimeout(() => {
            this.closeDialog();
        }, 1500);
    }


    closeDialog() {
        this._mdr.close();
    }
}
