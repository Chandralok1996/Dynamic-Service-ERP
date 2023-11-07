import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService, AdminService } from 'src/app/_services';
import { AddFieldComponent } from '../../add-field/add-field.component';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent {
  formID: number = 50002;
  linkedData:any;
  formFields: any;
  dynamicForm!: FormGroup;
  userCreated: any = localStorage.getItem('user-created');
  private formDataSubscription: Subscription = new Subscription();
  incr: any=0;
  subformdata:any=[];
  nosubform: any=[];
  linkListData: any;
  fmls_id:any;
  itemlistdata:any;
  constructor(private toaster: ToasterService,public dialog: MatDialog, private adminService: AdminService, private router: Router, private formBuilder: FormBuilder) {
    this.getFormDataById(this.formID);
    console.log(this.formID);
    
    this.dynamicForm = this.formBuilder.group({
      user_id:this.formBuilder.control('',[(Validators.required)]),
    });
    if(!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
  }

  ngOnInit(): void {
    this.getUserNameList();
  }
  getFormDataById(id: number): void {
    
    this.formDataSubscription.add(
      this.adminService.getFormByID(id).subscribe((res: any) => {
        if (res.status == 200) {
          this.formFields = res.rows;
          this.fmls_id=this.formFields[0].fmls_id;
          this.nosubform=res.rows
          this.nosubform=this.nosubform.filter((item:any)=>{
            return item.type!="subform"
          })
          console.log(this.formFields);
          this.subformdata=res.rows
          this.subformdata=this.subformdata.filter((item:any)=>{
            return item.type=="subform"
          })
          // this.formFields = this.formFields.sort((a: any, b: any) => {
          //   return a.position - b.position;
          // });
          this.formFields.forEach((value: any) => {
            if(value.mandatory) {
              this.dynamicForm.addControl(`${value.column_label}`, this.formBuilder.control(null, Validators.required));
            } else {
              this.dynamicForm.addControl(`${value.column_label}`, this.formBuilder.control(null));
            }
          });
          this.toaster.success(res.message);
        } else {
          this.toaster.error(res.message);
        }
      }, (error: any) => {
        this.toaster.error(`${error.status} ${error.statusText}`);
      })
    );
  }
  addField(item: any) {

    const dialogRef = this.dialog.open(AddFieldComponent, {
      width: '50%',
     // scrollStrategy: new NoopScrollStrategy(),
      disableClose: true,
      data: { data: item }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getFormDataById(this.formID);
    })


  
  }
  getIDBasedLinkingByUser(userId:any){
    
    var userData={
       fmls_id:this.fmls_id,
       id:[userId]
    }
    this.adminService.getIDBasedLinking(userData).subscribe((res: any) => {
      if (res.status == 200) {
        this.linkedData=res.rows;
        // this.linkedData.forEach((element:any) => {
        //   if(element['Affected Product'].length>0)
        //   {
        //     this.linkedAssetData=element['Affected Product'];
        // this.ShowLinkedData=true;
        //     this.dynamicForm.addControl('astd_id', this.formBuilder.control('', Validators.required));
        
        //   }
        // });
        this.toaster.success(res.message);

      } else {
        this.toaster.error("Something went wrong");
      }
    });
  }
  submitForm() {
    var match: any = this.dynamicForm.value, error: any = [];
    this.formFields.forEach((element: any) => {
      if(element.mandatory) {
        if(!match[element.column_label]) {
          error.push(`${element.column_label}`);
        }
      }
    });
    console.log(error)
    if(error.length > 0) {
      this.toaster.warning(`${error} is required!`);
      return;
    }
    this.userCreated.push(match);
    console.log(match);
    this.adminService.itemCreate(match).subscribe((res:any)=>{
      if(res.status==201)
      {
        this.toaster.success(res.message);
        this.router.navigate(["/item-master"]);
      }
      else
      {
        this.toaster.error("Something went wrong");
      }
    },)
    // localStorage.setItem('user-created', JSON.stringify(this.userCreated));
  }

  getUserNameList(){
    
      this.adminService.linkList(this.formID).subscribe((res:any)=>{
      console.log(res);
      this.linkListData=res.rows;
    })
  }

  ngOnDestroy(): void {
    this.formDataSubscription.unsubscribe();
  }
}
