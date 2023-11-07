import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService, AdminService } from 'src/app/_services';

@Component({
  selector: 'app-details-ticket',
  templateUrl: './details-ticket.component.html',
  styleUrls: ['./details-ticket.component.css']
})
export class DetailsTicketComponent {
  formID: number = 50006;
  formFields: any;
  dynamicForm!: FormGroup;
  userCreated: any = localStorage.getItem('user-created');
  private formDataSubscription: Subscription = new Subscription();
  incr: any=0;
  subformdata:any=[];
  nosubform: any=[];
  linkFormData:any=[];
  inid_id:any;
  DetailedArray:any;
  fmls_id:any;
  linkedData:any;
  columnLabelsData:any=[];
  columnLabelsValues:any=[];
  ShowLinkedData:boolean=false;
  incidentData:any;
  labels:any=[];
  mainDetailedArray:any=[];

  constructor(private toaster: ToasterService, public dialog: MatDialog,private adminService: AdminService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
   
    if(!this.userCreated) {
      this.userCreated = [];
    } else {
      this.userCreated = JSON.parse(this.userCreated);
    }
  }

  ngOnInit(): void {
    debugger
    this.getFormDataById(this.formID);

    var paramData = this.route.snapshot.params;
    this.inid_id=paramData['id'];

    this.incidentlist();
  }

  getFormDataById(id: number): void {
    debugger
    this.formDataSubscription.add(
      this.adminService.getFormByID(id).subscribe((res: any) => {
        if (res.status == 200) {
          this.formFields = res.rows;
          if(this.formFields.length!=0)
          {
            this.formFields.forEach((element2:any) => {
            this.labels.push(element2.column_label);
              
            });
          }
          this.toaster.success(res.message);
        } else {
          this.toaster.error(res.message);
        }
      }, (error: any) => {
        this.toaster.error(`${error.status} ${error.statusText}`);
      })
    );
  }

 
 //Item details or Item list
 incidentlist()
 {
debugger
   var patchpromise = new Promise<any>((resolve, reject) => {
     this.adminService.getIncidentdetailsbyId(this.inid_id).subscribe((res: any) => {
       this.incidentData = res.result;
       // this.linklistDetail=res.linkData[0]['User Name'][0];
      //  this.dynamicForm.patchValue({user_id:this.linklistDetail['user_id']})
       this.incidentData.map((res: any) => {
         // console.log(res);
       });

       console.log("Item details data");
       resolve("patching");
     });
   });

   patchpromise.then((res: any) => {
     console.log("Item details came");
    this.pachformdata();
   });


   
 
     
 }
 pachformdata()
 {
debugger

 setTimeout(() => {
  if(this.labels.length!=0 && this.incidentData.length!=0)
  {
  //  this.incidentData.forEach((ele:any) => {
  //   this.labels.forEach((element5:any) => {
  //     this.mainDetailedArray.push({
  //       element5:ele.value
  //       });
  
  //     })
  //  });
 // for (var i = 0; i < this.incidentData.length; i++) {
  this.mainDetailedArray = this.incidentData.map((obj:any) => {
    let filteredObj: { [key: string]: any } = {};
    this.labels.forEach((key: string) => {
      if (obj.hasOwnProperty(key)) {
        filteredObj[key] = obj[key];
      }
    });
    return filteredObj;
  });
  this.DetailedArray= this.mainDetailedArray[0];
  if(this.incidentData[1]['User Name'].length!=0)
  {
    this.DetailedArray.From=this.incidentData[1]['User Name'][0]['User Name'];
  }
  //}
}
 }, 2000);

 }
 updateTicketDetails(){
  this.router.navigate(["/it-sm/update-tickets",this.inid_id]);
 }
  ngOnDestroy(): void {
    this.formDataSubscription.unsubscribe();
  }
}
