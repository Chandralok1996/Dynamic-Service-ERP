import { Component, Inject, Input, OnInit } from "@angular/core";
import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AdminService, ToasterService } from "src/app/_services";
export interface DialogData {
  data: string;
}
@Component({
  selector: "app-add-field",
  templateUrl: "./add-field.component.html",
  styleUrls: ["./add-field.component.css"],
})
export class AddFieldComponent {
  addFieldForm: any;
  formaccessory: any;
  loading = false;
  submitted = false;
  label: any;
  fieldData: any;
  addFieldData: any;
  column_label:any;
  fieldtype:any;
  @Input() item: any;
  constructor(
   
    public dialogRef: MatDialogRef<AddFieldComponent>,
    private formBuilder: FormBuilder,
    private toaster: ToasterService,
    public adminService: AdminService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ) {
    
  }

  ngOnInit(): void {
    
    this.fieldData = this.dialogData.data;
   this.column_label=this.fieldData.column_label;
   
    this.addFieldForm = new FormGroup({
      column_value: new FormControl("", [Validators.required]),
    });
    // this.label = this.dialogData.data[column_label];
    console.log(this.dialogData);
    // this.dropdown();
  }

  get f() {
    return this.addFieldForm.controls;
  }
  // get fa() {return this.formaccessory.controls;}

  onNoClick() {
    this.dialogRef.close();
  }

  

  onSubmitField() {
    ;
    this.submitted = true;

    // reset alerts on submit
    //this.alterservices.clear();

    // stop here if form is invalid
    if (this.addFieldForm.invalid) {
      return;
    }
    this.loading = true;

    this.addFieldData = {
      fmmd_id: this.fieldData.fmmd_id,
      column_value: this.addFieldForm.value.column_value,
    };

    this.adminService
      .createMasterData(this.addFieldData)
      .subscribe((res: any) => {
        console.log(res);
        if(res.status == 200){
          this.onNoClick();

        
       
        }
        else if(res.status == 409){
         
          this.toaster.error(res.message);
        }
            console.log(res);
      });
  }
}
