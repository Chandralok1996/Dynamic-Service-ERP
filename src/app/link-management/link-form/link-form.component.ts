import { Component, OnInit, Inject} from '@angular/core';
import { AdminService, ToasterService } from 'src/app/_services';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder,  AbstractControl, ValidationErrors } from '@angular/forms';
import { concat } from 'rxjs';
@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.css']
})
export class LinkFormComponent {
  form: FormGroup = new FormGroup({
    // module_title: new FormControl(null),
    // module_id: new FormControl(null, [Validators.required]),
    // link_id: new FormControl(null, [Validators.required]),
    list_data : new FormControl (null, [Validators.required]),
    // assingdrop:new FormControl(null),
    // Form_Value: new FormControl(null, [Validators.required]),
  });
  fieldType: any;
  manualData: boolean = false;
  dData: any;
  formListData: any;
  formID: any ;
  formFieldData: any;
  paramData: any;
  mergedValue: any;
  newshowarr: any=[];
  msg:any=''
  formtype: any;
  toformlist: any;
  formdetailsfiled: any;
  concatval: any=[];
  list_data: any;
  filData: any;
  constructor(private fb: FormBuilder, public toaster: ToasterService, private Router: Router, private admin : AdminService, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.formList();
    this.mergeValues();
    this.form = this.fb.group({
    // module_title: new FormControl(null, [Validators.required]),
    list_data : new FormControl (null, [Validators.required]),
    module_id: new FormControl(null, [Validators.required]),
    link_id: new FormControl(null, [Validators.required]),
    spechar:new FormControl(null, [Validators.required]),
    title:new FormControl(null)
    }, { validator: this.compareFields });

   }

   compareFields(control: AbstractControl): ValidationErrors | null {
    const fromValue = control.get('module_id')?.value;
    const toValue = control.get('link_id')?.value;

    if (fromValue === toValue) {
      return { sameValue: true };
    }
    return null;
  }
   fieldsDetails(id:any) {
    this.admin.getFormByID(id).subscribe((res: any) => {
      this.formFieldData = res.rows;
      const columnLabels = this.formFieldData.map((row: any) => row.type);
      this.filData = this.formFieldData.filter((row: any) => {
        const dataType = row.type;
        return dataType === 'text' || dataType === 'date' || dataType === 'number' || dataType === 'addcolumn';
      });
      console.log(this.filData);
    }); 
}

mergeValues() {
  const staticSpecialCharacter = '#'; // Your static special character
  this.mergedValue = staticSpecialCharacter + this.formFieldData;
}

   formList(){
    this.admin.getFormList().subscribe((res:any)=>{
      console.log(res.rows);
      
      this.formListData = res.rows;
    })
   }
   formtoform(id:any)
   {
  
    console.log(id);
    
    this.admin.getFormByID(id).subscribe((res:any) => {
      console.log(res.rows);
      this.formFieldData = res.rows;
      this.toformlist=this.formListData.filter((res:any)=>{
        return res.fmls_id!=id
      })
  });

   }
   formdetails(id:any)
   {
    this.fieldsDetails(id)

     this.admin.getFormByID(id).subscribe((res:any)=>{
      this.formdetailsfiled=res.rows
     })
   
      
  
     }
     getValue(param:any)
     {
      this.paramData = param.value;
  
     }
 getchar(val:any)
 {
this.msg=''
this.newshowarr.push(this.paramData+""+""+val.value) 
console.log(this.newshowarr);
this.paramData=''
if(this.newshowarr.length!=0)
{
  for(var i=0;i<this.newshowarr.length;i++)
{
  this.msg=this.msg+this.newshowarr[i]
}

}

 
 }
  onSubmit(): void {
    let x=this.msg.charAt(this.msg.length-1)
  
      if(x==="/" || x==="@" || x==="_" || x==="$" || x==="&" ||x===" " || x==="#")
      {
        console.log("ckk");
  
        
        this.msg = this.msg.substring(0, this.msg.length - 1); 
      }
    
  console.log(this.form.value);
  

    var format={
      "module_title":this.form.value.title,
      "module_id":this.form.value.module_id,
      "link_id":this.form.value.link_id,
      "list_data":this.msg,
    }
    console.log(format);
    
    this.admin.createLink(format).subscribe((res: any) => {
      console.log(res);
      
      if (res.status == 201) {
        this.toaster.success('Linked Successfully',);
        this.Router.navigate(['/link-form']);
      } else {
        this.toaster.error('Error',);
      }
    },(error)=>{
     
      for(var i=0;i<error.error.validtionError.length;i++)
      {
        this.toaster.error(error.error.validtionError[i]);

      }

    }
    );
  }

  typeSelection(data:any): void {
    console.log(data.value);  
  }

}
