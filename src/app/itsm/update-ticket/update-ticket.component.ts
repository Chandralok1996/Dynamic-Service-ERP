import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService, AdminService } from 'src/app/_services';
import { AddFieldComponent } from 'src/app/master/add-field/add-field.component';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent {
  formID: number = 50006;
  formFields: any;
  dynamicForm!: FormGroup;
  userCreated: any = localStorage.getItem('user-created');
  private formDataSubscription: Subscription = new Subscription();
  incr: any=0;
  subformdata:any=[];
  nosubform: any=[];
  linkFormData:any=[];
  incidentData:any=[];
  fmls_id:any;
  linkedData:any;
  ShowLinkedData:boolean=false;
  linkedAssetData:any;
  inid_id:any;

  constructor(private toaster: ToasterService, public dialog: MatDialog,private route: ActivatedRoute,private adminService: AdminService, private router: Router, private formBuilder: FormBuilder) {
    this.getFormDataById(this.formID);
    this.dynamicForm = this.formBuilder.group({});
    if(!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
  }

  ngOnInit(): void {
    debugger
    var paramData = this.route.snapshot.params;
    this.inid_id=paramData['id'];
    this.incidentListDetails();
    this.getLinkedFormList();
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
          this.formFields = this.formFields.sort((a: any, b: any) => {
            return a.position - b.position;
          });
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
   //For Incident details
   incidentListDetails()
   {
 
     var patchpromise = new Promise<any>((resolve, reject) => {
       this.adminService.getIncidentDetails(this.inid_id).subscribe((res: any) => {
         this.incidentData = res.result;
         this.incidentData.map((res: any) => {
           // console.log(res);
         });
 
         console.log("Incident details data");
         resolve("patching");
       });
     });
 
     patchpromise.then((res: any) => {
       console.log("Incident details came");
       this.pachformdata();
     });
 
   
   }
 
   pachformdata()
   {
     debugger
     console.log(this.incidentData);
   
   setTimeout(() => {
     for (var i = 0; i < this.incidentData.length; i++) {
      // this.dynamicForm.patchValue(this.incidentData[i]);
       this.dynamicForm.patchValue(this.incidentData[0]);
     }
   }, 2000);
   }
  getLinkedFormList() {
    
    this.adminService.linkList(this.formID).subscribe((res:any)=>{
      console.log(res);
      this.linkFormData=res.rows;
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
        this.linkedData.forEach((element:any) => {
          if(element['Affected Product'].length>0)
          {
            this.linkedAssetData=element['Affected Product'];
        this.ShowLinkedData=true;
            this.dynamicForm.addControl('astd_id', this.formBuilder.control('', Validators.required));
        
          }
        });
        this.toaster.success(res.message);

      } else {
        this.toaster.error("Something went wrong");
      }
    });
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
  submitForm() {
    debugger
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
    this.adminService.incidentUpdate(match).subscribe((res:any)=>{
      if(res.status==201)
      {
        this.toaster.success(res.message);
        this.router.navigate(["/it-sm"]);
      }
      else
      {
        this.toaster.error("Something went wrong");
      }
    },)
    // localStorage.setItem('user-created', JSON.stringify(this.userCreated));
  }
  ngOnDestroy(): void {
    this.formDataSubscription.unsubscribe();
  }
}

