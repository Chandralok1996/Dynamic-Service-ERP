import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService, AdminService } from 'src/app/_services';
import { AddFieldComponent } from '../../add-field/add-field.component';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent {
  formID: number = 50002;
  formFields: any;
  dynamicForm:any;
  userCreated: any = localStorage.getItem('user-created');
  private formDataSubscription: Subscription = new Subscription();
  incr: any=0;
  promisedata:any;
  formfieldname: any;
  itemlistdata: any;
  astdid: any;
  updatebtn:boolean=false;
  itemDetails:any=[];
  linkListData:any=[]
  linklistDetail:any;
  userName:any;
  constructor(private toaster: ToasterService, public dialog: MatDialog,private adminService: AdminService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) 
  {
    this.dynamicForm = this.formBuilder.group({
      user_id:this.formBuilder.control('',[(Validators.required)]),
    });

    // this.dynamicForm = new FormGroup({
    //   column_value: new FormControl("", [Validators.required]),
    // });
    if(!this.userCreated) {
      this.userCreated = [];
    } else { this.userCreated = JSON.parse(this.userCreated);}
  }
  ngOnInit(): void {
    var paramData = this.route.snapshot.params;
    this.astdid=paramData['id']
    this.getFormDataById(this.formID);
    this.getUserNameList();
  }

  getFormDataById(id: number): void {
    
    this.promisedata=new Promise<any>((resolve,reject)=>{
      this.formDataSubscription.add(
        this.adminService.getFormByID(id).subscribe((res: any) => {
          if (res.status == 200) {
            this.formFields = res.rows;
              this.formfieldname=this.formFields
            this.formFields = this.formFields.sort((a: any, b: any) => {
              return a.position - b.position;
            });
            this.formFields.forEach((value: any) => {
              if(value.mandatory) {
                this.dynamicForm.addControl(`${value.column_label}`,this.formBuilder.control('',Validators.required));
              } else {
                this.dynamicForm.addControl(`${value.column_label}`,this.formBuilder.control(''));
              }
            });
          } else {
          }
        }, (error: any) => {
          this.toaster.error(`${error.status} ${error.statusText}`);
        })
      );
      resolve("done")
    })
    this.itemlist();
        // this.promisedata.then((res: any)=>{
        //   this.itemlist()
        // })
  }
  //Item details or Item list
  itemlist()
  {

    // var patchpromise = new Promise<any>((resolve, reject) => {
      this.adminService.getItemdetails(this.astdid).subscribe((res: any) => {
        this.itemlistdata = res.result;
        this.pachformdata();
        // this.linklistDetail=res.linkData[0]['User Name'][0];
       //  this.dynamicForm.patchValue({user_id:this.linklistDetail['user_id']})
       

      });
   // });

    // patchpromise.then((res: any) => {
    //   console.log("Item details came");
    //   this.pachformdata();
    // });

  
  }

  pachformdata()
  {
    debugger
    setTimeout(() => {
      for(var i=0;i<this.itemlistdata.length;i++)
      {
         this.dynamicForm.patchValue(this.itemlistdata[i]);
      }
     }, 2000);
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

  getUserNameList(){
    
    this.adminService.linkList(this.formID).subscribe((res:any)=>{
    console.log(res);
    this.linkListData=res.rows;
  })
}
  submitForm() {
    debugger
    if(this.dynamicForm.invalid)
    {
      return;
    }
    this.updatebtn=true;
    var match: any = this.dynamicForm.value, error: any = [];
    this.userCreated.push(match);
    console.log(match);
    match.astd_id=this.astdid;
    this.adminService.updateItem(match).subscribe((res:any)=>{
      console.log(res);
      if(res.status==200)
      {
        this.toaster.success(res.message);
        this.router.navigate(['/item-master']);
      }
      else
      {
        this.toaster.error("Something went wrong");
        this.updatebtn=false;
      }
    },)
    // localStorage.setItem('user-created', JSON.stringify(this.userCreated));
  }
  ngOnDestroy(): void {
    this.formDataSubscription.unsubscribe();
  }
}
