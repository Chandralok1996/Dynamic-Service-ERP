import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdminService, AppService, ToasterService } from 'src/app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalalertComponent } from '../form-master/modalalert/modalalert.component';
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit{
  dataSource: any;
  pagination: any;
  check_id:any="";
  emp_array:any=[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['form_name'];
  formData: any;
  field_id:any;
  disablecheck:boolean=false;
  col_format:any=[

  ]
  dataFormat:any={
      
  
  
      "fmls_id":"",
      "uscorg_id":"",
      "visibility":""
    
  }

  abc:any=[]
  apiFormat:any=[
    {
      "fmmd_id":null,
      "permission":null
    }
  ]
  permission: any;
  roleobject: any;
  roleid: any;
  readonly: boolean=false;
  formID: any;
  discheckid: any;
  disroleid: any;
  applyobjformat:any=[];
  unchecked: boolean=false;
  hideshow:any=""
  fordele: any;
  userolelist: any;
  formorgarray:any=[]
  orgList: any;
  constructor(private adminService: AdminService,
    private route:ActivatedRoute, private toaster: ToasterService, private service: AppService,
    private router:Router,
    private matDialog: MatDialog,) {
    this.pagination = this.service.pagination;
    // this.formID = this.route.snapshot.paramMap.get('id');
    // this.getFormDataById(this.formID);
  }
  ngOnInit(): void {
    
    this.getFormList()
    this.adminService.getOrgList().subscribe((res:any)=>{
      console.log(res);
      this.orgList=res.rows
      for(var i=0;i<this.orgList.length;i++)
      {
        this.displayedColumns.push(this.orgList[i].org)

      }
      setTimeout(() => {
        this.displayedColumns.push('Action')
 
      }, 200);

      
    })
  }
  getFormList(): void {
      this.adminService.getFormList().subscribe((res: any) => {
        if (res.status == 200) {
          this.formData = res.rows;
          
          console.log(this.formData);
          
    
          this.formData=this.formData.map((item:any)=>({
            ...item,Action:true
          }))

          // this.formData=this.formData.filter((item:any)=>{
          //   return item.column_label!="User Role"
          // })
          this.dataSource = new MatTableDataSource(this.formData);
          this.dataSource.paginator = this.paginator;
         
        } else {
          this.toaster.error(res.message);
        }
      }, (error: any) => {
        this.toaster.error(`${error.status} ${error.statusText}`);
      })
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getevent(ac:any,data:any,col:any,event:any)
  {
    //ac--> c or u or R
    //data->org name
    //col-->filed id
    console.log(data);
    console.log(col);

    console.log(event.target.checked);
    this.hideshow="dj"
    //get filed id
   this.check_id=col
//adding here action keys in form data for button disable
   this.formData.map((item:any)=>{
    if(item.fmls_id==this.check_id)
    {
      item.Action=false
    }
   })
     //here filtering role
    
   data=data
     this.roleid=data
     //if abc array is empty
    console.log(ac);

   console.log(this.formData);

 
if(this.abc.length==0)
{
  console.log(  this.formData
    );
  let formfiledata=this.formData.filter((item:any)=>{
    return item.fmls_id==this.check_id
  })
  console.log(formfiledata);
  
  for(var i=0;i<formfiledata[0].orgPermission.length;i++)
  {
    if(formfiledata[0].orgPermission[i].uscorg_id==data)
    {
            console.log(formfiledata[0].orgPermission[i]
              );

        // this.dataFormat.insert_column=formfiledata[0].permission[i].insert_column
        // this.dataFormat.update_column=formfiledata[0].permission[i].update_column
        // this.dataFormat.read_only=formfiledata[0].permission[i].read_only
        this.dataFormat.visibility=formfiledata[0].orgPermission[i].visibility
    }
  }
  this.dataFormat.uscorg_id=data
  this.dataFormat.fmls_id=this.check_id
  // this.dataFormat.col_id=this.check_id
  
if(event.target.checked==true)
{
   this.dataFormat.visibility=true;
}
else
{
  this.dataFormat.visibility=false;

}
  this.abc.push(this.dataFormat)
}
 else
 {
  let check:any=[]
  var basedcol=this.abc.filter((res:any)=>{
    return res.fmls_id==this.check_id
  })
  
check=basedcol.filter((item:any)=>{
    return item.uscorg_id==data 
  })
  console.log(check);
  if(check.length!=0)
      {
 
        let index=this.abc.findIndex((obj:any) => {
          return obj.uscorg_id==data && obj.fmls_id==this.check_id ;
        });
        this.abc[index].uscorg_id
        this.abc[index].fmls_id=this.check_id
        if(event.target.checked==true)
        {

          this.abc[index].visibility=true
        
        }else 
        {
          this.abc[index].visibility=false
        }
      }
      else
      {
        var xyz:any={
          "uscorg_id":"",
          "visibility":null,
          "fmls_id":this.check_id
        }
        console.log(this.formData);
        console.log(this.check_id);
        
        let formfiledata=this.formData.filter((res:any)=>{
          return res.fmls_id==this.check_id
        })
        for(var i=0;i<formfiledata[0].orgPermission.length;i++)
        {
          if(formfiledata[0].orgPermission[i].uscorg_id==data)
          {
    
            xyz.visibility=formfiledata[0].orgPermission[i].visibility
          }
        }
        xyz.uscorg_id=data
        xyz.fmls_id=this.check_id
        if(event.target.checked==true)
        {

          xyz.visibility=true
        
        }else
        {
          xyz.visibility=false
        }
        this.abc.push(xyz)
        console.log(this.abc);
        
      }

 }

console.log(this.abc);
  }
 
 



 


  
  saveAllData()
  {

   console.log(this.applyobjformat);
  
    var arr:any=[]
    for(var i=0;i<this.applyobjformat.length;i++)
    {
      this.applyobjformat[i].forEach((element:any) => {
        console.log(element.fmls_id);
        arr.push({
              "fmls_id":element.fmls_id,
              "permission":[{
                "uscorg_id": element.uscorg_id,
                "visibility":element.visibility
              }]
            })
      });
    }
      let apiFormat={
      "forms":arr,
      "Pri_For":"Org_form"
    }
    this.matDialog.open(ModalalertComponent,{
      data:apiFormat,disableClose: true,

    })
 
    // console.log(arr);
    
  

    

    
  }
  savedata(fmls_id:any)
  {
    console.log(this.abc);

    var data=this.abc.filter((item:any)=>{
      return item.fmls_id==fmls_id
    })
    console.log(data);

 if(this.applyobjformat.length!=0)
 {
  for(var i=0;i<this.applyobjformat.length;i++)
  {
    for(var j=0;j<this.applyobjformat[i].length;j++)
    {
      if(this.applyobjformat[i][j].fmls_id===fmls_id)
      {
        console.log(i);
        this.applyobjformat.splice(i,1)
        break;
      }
    }
  }
 }

this.applyobjformat.push(data)
this.formData.map((item:any)=>{
  if(item.fmls_id==fmls_id)
  {
    console.log(item);
    item.del=true;
    
  }
})


    console.log(this.applyobjformat);


    
// var objformat={
//   "fmmd_id":data[0].col_id,
//   "permission":""
// }


//     console.log("ehllo");
    
    
//     console.log(data);

//     if(data.length==0)
//     {
//       this.toaster.error("You have not select any previlenge")
//     }
//     else
//     {
//       var apiFormat:any={
//         "fields":[
// {
//   "fmmd_id":data[0].col_id,
//   "permission":""
// }
//         ]
//       }
//      data.forEach((item:any)=>{
//       Reflect.deleteProperty(item, 'col_id');
//      })
//      apiFormat.fields[0].permission=data
//      console.log(apiFormat)

//      this.adminService.applyprevilenge(apiFormat).subscribe((res:any)=>{
// console.log(res)
//      },
//      (error:any) => {                             
// this.toaster.error(error.message)
//     }
     
//      ),
//       this.toaster.success("Added Previlenge!")
//     }    
  }
  deletedata(fmmd_id:any)
  {
    if(this.applyobjformat.length!=0)
    {
     for(var i=0;i<this.applyobjformat.length;i++)
     {
       for(var j=0;j<this.applyobjformat[i].length;j++)
       {
         if(this.applyobjformat[i][j].col_id===fmmd_id)
         {
           console.log(i);
            var deletedata=this.applyobjformat[i];
           this.applyobjformat.splice(i,1)
           this.formData.filter((item:any)=>{
            if(item.fmmd_id==fmmd_id)
            {
              item.Action=true;
              item.del=false
            }
           })
           console.log(deletedata);
           this.formData.filter((item:any)=>{
            if(item.fmmd_id==fmmd_id)
            {
              
              console.log(item.permission);
              this.fordele=item.permission

             
            }
           })
           this.formData.map((item:any)=>{
            if(item.fmmd_id==fmmd_id)
            {
             item.permission=[]
             setTimeout(() => {
              this.fordele.forEach((element:any) => {
                console.log(element);

                
                  item.permission.push(element)

              });
             }, 0);
           
              
              console.log(item.permission);
              console.log(item.permission);
            }
           })
           break;
         }
       }
     }
    }

    console.log(this.applyobjformat);
    
  }
}
