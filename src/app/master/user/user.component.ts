import { Component, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdminService, ToasterService, AppService } from 'src/app/_services';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FormGroup ,FormControl} from '@angular/forms';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  formData: any;
  dataSource: any;
  userCreated: any = localStorage.getItem('user-created');
  pagination: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: any = [];
  private formListSubscription: Subscription = new Subscription();
  tempvar:any;
  copyDisplayColumn: any;
  temparray:any=[]
  userlistdata: any;
  formID: any = 50001;
  formlabel: any
  formfield:any=[]
  getkeys: any;
  x: any=[];
  orgkeys: any;

  constructor(private adminService: AdminService, 
    private toaster: ToasterService, 
    private service: AppService,
    private router:Router
    ) {
    this.userCreated = JSON.parse(this.userCreated);
    this.pagination = this.service.pagination;
  }
  public hello: any;
  isMenuOpened: boolean = false;

  ngOnInit(): void {
   this.userlist()
   this.getformfield()
  }
 
  getformfield()
  {
console.log(this.formID);

this.adminService.getFormByID(this.formID).subscribe((res:any)=>{
  console.log(res);
  this.formlabel=res.rows
this.formlabel.forEach((element:any) => {
  this.formfield.push(element.column_label)
});
console.log(this.formfield);
console.log(this.formfield);
this.tempvar=this.formfield.map((item:any)=>{

  return {
    "keyName":item,
    "check":true
  }
    
})
console.log(this.tempvar);
this.tempvar=this.tempvar.map((res:any)=>{
  if(res.keyName=="First Name" ||res.keyName=="Email ID" || res.keyName=="Department" || res.keyName=="Login Name" || res.keyName=="Last Name" || res.keyName=="Mobile Number")
  {
    return {
      "keyName":res.keyName,
      "check":true
    }
  }
  else
  {
    return {
      "keyName":res.keyName,

      "check":false
    }
  }
 
})
// this.copyDisplayColumn=this.tempvar
this.orgkeys=this.tempvar
this.getkeys=this.tempvar.filter((res:any)=>{
  return res.check==true
})
console.log(this.getkeys);
 this.x
for(var i=0;i<this.getkeys.length;i++)
{
      this.x.push(this.getkeys[i].keyName)
}

console.log(this.x);
this.x.push('Action')
this.copyDisplayColumn=this.x
})



  }
  userlist()
  {
   var a= this.adminService.userlist().subscribe(
    (res:any)=>{
      console.log(res.status);
      this.userlistdata=res.result
      console.log(a);
      
var keyarr:any=[]
    //   this.userlistdata.forEach((element:any) => {
    //     keyarr.push(Object.keys(element))
    //   });
    //   keyarr=keyarr.flat()
    //   keyarr = [...new Set(keyarr)];
    //   console.log(keyarr);
     
    //   var newkeyarr:any=[]
    
   

      // this.displayedColumns = this.formfield;
      // this.copyDisplayColumn=this.displayedColumns
      // this.hello=this.displayedColumns
      // setTimeout(() => {
    
      // }, 1000);
    
      // console.log(this.tempvar);
      // this.tempvar.map((item:any)=>{
      //   console.log(item.keyName);
        
      // })
      this.dataSource = new MatTableDataSource(this.userlistdata);
      this.dataSource.paginator = this.paginator;

    },
    (error:any)=>{
      console.log(error.error.message);
      if(error.error.message=="Token is not provided")
      {
    
              this.service.logout()
      }
    }
    )
    
    
  }
  selectlabel(event:any,data:any)
  {
    console.log(this.orgkeys);
    var getorg:any=[]
    for(var i=0;i<this.orgkeys.length;i++)
    {
      getorg.push(this.orgkeys[i].keyName)
    }
    console.log(getorg);
    if(event.checked==true){

      let getindex=getorg.indexOf(data.keyName)
      console.log(getindex);
                  this.x.splice(getindex, 0, data.keyName);
this.displayedColumns=this.x
console.log(this.displayedColumns);
let actionind=this.displayedColumns.indexOf('Action')
console.log(actionind);

this.displayedColumns.splice(actionind,1)
console.log(this.displayedColumns);

        this.displayedColumns.push('Action');

    }
    else
    {
      //unchecked
        let getindex=this.x.indexOf(data.keyName)
        console.log(getindex);
        this.x.splice(getindex,1)
        this.displayedColumns=this.x

        console.log(this.displayedColumns);
        
                // this.displayedColumns.push('Action');

    }
    // console.log(this.hello);
    // this.hello=this.hello.filter((res:any)=>{
    //   return res!="Action"
    // })
    // console.log(event.checked);
    
    // if(event.checked==true)
    // {
    //    console.log(true);
    //    console.log(data.keyName);
    //    for(let x=0;this.temparray.length;x++)
    //   {
    //     this.temparray.splice(data.keyName,1)
    //   }
    //    this.temparray.splice(data.keyName,1)
    //    for(let i=0;i<this.displayedColumns.length;i++)
    //    {
    //       if(this.displayedColumns[i]==data.keyName)
    //       {
    //         console.log("exits");

    //         break
            
    //       }
    //       else
    //       {
    //         console.log("not exits");
    //         for(let n=0;n<this.temparray.length;n++)
    //         {
    //           if(this.temparray[n]==data.keyName)
    //           {
    //               console.log("ehllo");
                  
    //           }
    //           else
    //           {
    //             this.temparray.push(data.keyName)

    //           }
    //         }

    //         var checkindex=this.hello.indexOf(data.keyName)
    //         this.displayedColumns.splice(checkindex, 0, data.keyName);
    //         console.log(checkindex);
            
    //         // this.displayedColumns.push(data.keyName)
    //         // this.copyDisplayColumn=this.displayedColumns
    //         break
    //       }
    //    }
        
    // }
    // else
    // {
    //   console.log(false);
       
    //         this.temparray.push(data.keyName)

          
        
    //   for(var i=0;i<this.temparray.length;i++)
    //   {
    //     // this.displayedColumns.splice(this.temparray[i],1)
    //     // console.log(this.temparray[i]);
    //     // this.displayedColumns.remove(this.temparray[i])
    //     var index=  this.displayedColumns.indexOf(this.temparray[i])
    //       if(index>-1)
    //       {
    //                 this.displayedColumns.splice(index,1)

    //       }
    //   }

    // }
    // console.log(this.hello);
    
    // console.log(this.displayedColumns);
    
    // this.copyDisplayColumn=this.displayedColumns
    // console.log(this.temparray);
    
  }

  userupdate(data:any)
  {
    console.log(data);
    this.router.navigate(['/user-master/update',data]);
    
  }
  toggler(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.formListSubscription.unsubscribe();
  }
  
}