import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AdminService } from "src/app/_services";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToasterService } from "src/app/_services";
@Component({
  selector: 'app-add-subform',
  templateUrl: './add-subform.component.html',
  styleUrls: ['./add-subform.component.css']
})
export class AddSubformComponent  {
  showinput: boolean=false;
  name:any;
  obj:any=[]
  formID: any;
  subform: any;
  module_title:any=[]
  field_type: any;
  formdata: any;
  form_name: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  private admin:AdminService,
  private toaster:ToasterService,

  )
  {
    this.formID = data;

  }
  form: FormGroup = new FormGroup({
    column_label: new FormControl(null, [Validators.required]),
    column_type: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    // position: new FormControl(null, [Validators.required]),

  });
  ngOnInit(): void {
    this.admin.getFormByID(this.formID.formid).subscribe((res:any)=>{
      console.log(res);
      this.subform=res.rows
      this.subform=this.subform.filter((item:any)=>{
        return item.type=="subform"
      })
      console.log(this.subform);
        this.subform.forEach((element:any) => {
          this.module_title.push({
            "title":element.module_title
          })
        });
        console.log(this.module_title);
       
        
    })
  }
  typeSelection(data:any)
  {
    this.field_type=data.value
  }
  typeform(data:any)
  {
    console.log(data.target.value);
    this.form_name=data.target.value
    
  }
  openinput()
  {
    
    this.showinput=true;
  }
  savedata(data:any)
  {
    console.log(data);
    
      this.module_title.push({
        "title":data
      })
      console.log(this.module_title);
      this.showinput=false;
  }
  onsubmit()
  {
    console.log(this.form.value);
    this.formdata=this.form.value;
    console.log(this.formdata);
    this.formdata.type="subform",
    this.formdata.module_title=this.form_name
    this.formdata.fmls_id=this.formID.formid
    this.formdata.columnDetail = [{ 
      "column_label": this.formdata.column_label, 
      "column_type": this.formdata.column_type, 
      "mandatory": false
    }];
    console.log(this.formdata);
    
    this.admin.addColumnInForm(this.formdata).subscribe((res: any) => {
      if(res.status == 201) {
        // this._mdr.close(res.status == 201);
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
