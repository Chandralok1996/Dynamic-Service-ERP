import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdminService, AppService, ToasterService } from 'src/app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalalertComponent } from '../modalalert/modalalert.component';

@Component({
  selector: 'app-previlenge',
  templateUrl: './previlenge.component.html',
  styleUrls: ['./previlenge.component.css']
})
export class PrevilengeComponent implements OnInit {
  dataSource: any;
  pagination: any;
  check_id:any="";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['column_label'];
  formData: any;
  field_id:any;
  disablecheck:boolean=false;
  col_format:any=[

  ]
  dataFormat:any={
      
      "usrl_id":"",
      "insert_column": "",
      "update_column":"",
      "read_only": "",
      "col_id":""
    
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
  constructor(private adminService: AdminService,
    private route:ActivatedRoute, private toaster: ToasterService, private service: AppService,
    private router:Router,
    private matDialog: MatDialog,) {
    this.pagination = this.service.pagination;
    this.formID = this.route.snapshot.paramMap.get('id');
    this.getFormDataById(this.formID);
  }
  ngOnInit(): void {
    
  }
  getFormDataById(id: number): void {
      this.adminService.getFormByID(id).subscribe((res: any) => {
        if (res.status == 200) {
          this.formData = res.rows;
          
          console.log(this.formData);
          
          console.table(this.formData);
          this.userolelist=res.userRole[0]
     
          this.formData=this.formData.map((item:any)=>({
            ...item,Action:true
          }))

          this.formData.map((item:any)=>{
            console.log(item);
            console.log(item.permission);
            if(item.permission!=undefined)
            {
              for(var i=0;i<item.permission.length;i++)
              {
                console.log(item.permission[i].update_column);
                  if(item.permission[i].update_column==true)
                  {
                    item.permission[i].disable=true
                  }
                  else{
                    item.permission[i].disable=false
                  }                
              }
            }
            
            
          })
   

          console.log(this.formData);
          
       
    
          this.roleobject=this.userolelist.column_value
          console.log(this.roleobject);
          
          var column=this.userolelist.column_value
          var arr:any=[]
          var getcol=column.forEach((item:any)=>{
            arr.push(item.value)
          })
          console.log(arr);
          this.displayedColumns=this.displayedColumns.concat(arr);
          console.log(this.displayedColumns);
          this.displayedColumns.push('Action')
          this.formData=this.formData.filter((item:any)=>{
            return item.column_label!="User Role"
          })
          this.dataSource = new MatTableDataSource(this.formData);
          this.dataSource.paginator = this.paginator;
          this.toaster.success(res.message);
        } else {
          this.toaster.error(res.message);
        }
      }, (error: any) => {
        this.toaster.error(`${error.status} ${error.statusText}`);
      })
    
  }
  getevent(ac:any,data:any,col:any,event:any)
  {
    //ac--> c or u or R
    //data->Role name
    //col-->filed id
    console.log(event.target.checked);
    this.hideshow="dj"
    //get filed id
   this.check_id=col.fmmd_id
//adding here action keys in form data for button disable
   this.formData.map((item:any)=>{
    if(item.fmmd_id==this.check_id)
    {
      item.Action=false
    }
   })
     //here filtering role
     data=this.roleobject.filter((res:any)=>{
      return res.value==data
     })
     this.roleid=data   
     data=data[0].id
     this.roleid=this.roleid[0].value
     //if abc array is empty
    console.log(ac);

   console.log(this.formData);

 
if(this.abc.length==0)
{
  let formfiledata=this.formData.filter((item:any)=>{
    return item.fmmd_id==this.check_id
  })
  console.log(formfiledata);
  
  for(var i=0;i<formfiledata[0].permission.length;i++)
  {
    if(formfiledata[0].permission[i].usrl_id==data)
    {
            console.log(formfiledata[0].permission[i]
              );

      this.dataFormat.insert_column=formfiledata[0].permission[i].insert_column
      this.dataFormat.update_column=formfiledata[0].permission[i].update_column
      this.dataFormat.read_only=formfiledata[0].permission[i].read_only
    }
  }

  if(ac=="C")
  {
    this.dataFormat.usrl_id=data
      this.dataFormat.col_id=this.check_id
    if(event.target.checked==true)
    {
        this.dataFormat.insert_column=true
        if(this.dataFormat.update_column==true)
        {
          this.dataFormat.read_only=false
        }
    }
    else
    {
      this.dataFormat.insert_column=false

    }
  }
  else if(ac=="U")
  {
    this.dataFormat.usrl_id=data
      this.dataFormat.col_id=this.check_id
      if(event.target.checked==true)
      {
          this.dataFormat.update_column=true
          this.dataFormat.insert_column=true
        if(this.dataFormat.update_column==true)
        {
          this.dataFormat.read_only=false
          this.formData.map((item:any)=>{
            if(item.fmmd_id==this.check_id)
            {
              console.log(item.permission);
              
              
              for(var i=0;i<item.permission.length;i++)
              {
                if(item.permission[i].usrl_id==data)
                {
                  console.log(item.permission[i]);
                  item.permission[i].insert_column=true
                  item.permission[i].read_only=false
                  item.permission[i].disable=true
                }
                
              }
              
            }
           })
          
        }
      }
      else
      {
        this.dataFormat.update_column=false
        if(this.dataFormat.update_column==false)
        {
          this.dataFormat.read_only=true;
          this.formData.map((item:any)=>{
            if(item.fmmd_id==this.check_id)
            {
              console.log(item.permission);
              for(var i=0;i<item.permission.length;i++)
              {
                if(item.permission[i].usrl_id==data)
                {
                  console.log(item.permission[i]);
                  item.permission[i].disable=false
                  
                }
                
              }
              
            }
           })
        }
      }
   
  }else if(ac=="R")
  {
    this.dataFormat.usrl_id=data
      this.dataFormat.col_id=this.check_id
      if(event.target.checked==true)
      {
          this.dataFormat.read_only=true
          
          if(this.dataFormat.update_column==true)
          {
            this.dataFormat.read_only=false
            this.unchecked=false


          }
          else 
          {
            this.dataFormat.read_only=true;
            if(this.dataFormat.read_only==true)
            {
              this.dataFormat.update_column=false
            }
          } 
      }
      else
      {
        this.dataFormat.read_only=false
        if( this.dataFormat.read_only==false)
        {
          this.dataFormat.update_column=true
        }
      }
  }
  this.abc.push(this.dataFormat)
}
 else
 {
  let check:any=[]
  var basedcol=this.abc.filter((res:any)=>{
    return res.col_id==this.check_id
  })
  
check=basedcol.filter((item:any)=>{
    return item.usrl_id==data 
  })
  console.log(check);
  if(check.length!=0)
      {
 
        let index=this.abc.findIndex((obj:any) => {
          return obj.usrl_id==data && obj.col_id==this.check_id ;
        });
        if(ac=="C")
        {
          this.abc[index].usrl_id
          this.abc[index].col_id=this.check_id
          if(event.target.checked==true)
          {

            this.abc[index].insert_column=true
            if(this.abc[index].update_column==true)
            {
              this.abc[index].read_only=false
            }
          }else 
          {
            this.abc[index].insert_column=false
          }
        }
        else if(ac=="U")
        {
          this.abc[index].usrl_id
          this.abc[index].col_id=this.check_id
          if(event.target.checked==true)
          {
            this.abc[index].update_column=true
            if(this.abc[index].update_column==true)
            {
              this.abc[index].read_only=false
              this.abc[index].insert_column=true
          
              this.formData.map((item:any)=>{
                if(item.fmmd_id==this.check_id)
                {
                  console.log(item.permission);
                  console.log(item);
                
                  
                  for(var i=0;i<item.permission.length;i++)
                  {
                    if(item.permission[i].usrl_id==data)
                    {
                      console.log(item.permission[i]);
                      item.permission[i].insert_column=true
                      item.permission[i].read_only=false
                      item.permission[i].disable=true                      
                    }
                    
                  }
                  
                }
               })
            }
          }else 
          {
            this.abc[index].update_column=false
            if( this.abc[index].update_column==false)
            {
              this.abc[index].read_only=true
              this.formData.map((item:any)=>{
                if(item.fmmd_id==this.check_id)
                {
                  console.log(item.permission);
                  for(var i=0;i<item.permission.length;i++)
                  {
                    if(item.permission[i].usrl_id==data)
                    {
                      console.log(item.permission[i]);
                      item.permission[i].disable=false
                      
                    }
                    
                  }
                  
                }
               })
            }
          }
        }
        else if(ac=="R")
        {
          this.abc[index].usrl_id
          this.abc[index].col_id=this.check_id
          if(event.target.checked==true)
          {
            this.abc[index].read_only=true
            if(this.abc[index].update_column==true)
            {
              this.abc[index].read_only=false

            }


          }else 
          {
            this.abc[index].read_only=false
            if(this.abc[index].read_only==false)
            {
              this.abc[index].update_column=true
            }
          }
        }
      }
      else
      {
        var xyz:any={
          "usrl_id":"",
          "insert_column": '' ,
          "update_column":'',
          "read_only": '',
          "col_id":this.check_id
        }
        let formfiledata=this.formData.filter((res:any)=>{
          return res.fmmd_id==this.check_id
        })
        for(var i=0;i<formfiledata[0].permission.length;i++)
        {
          if(formfiledata[0].permission[i].usrl_id==data)
          {
            xyz.insert_column=formfiledata[0].permission[i].insert_column
            xyz.update_column=formfiledata[0].permission[i].update_column
            xyz.read_only=formfiledata[0].permission[i].read_only
          }
        }

        if(ac=="C")
        {
          xyz.usrl_id=data
          xyz.col_id=this.check_id
          if(event.target.checked==true)
          {

            xyz.insert_column=true
            if(xyz.update_column==true)
            {
              xyz.read_only=false;
            }
          }else
          {
            xyz.insert_column=false
          }
        }
      else  if(ac=="U")
        {
          xyz.usrl_id=data
          xyz.col_id=this.check_id
          if(event.target.checked==true)
          {
            xyz.update_column=true
            if(xyz.update_column==true)
            {
              xyz.read_only=false;
              xyz.insert_column=true
              this.formData.map((item:any)=>{
                if(item.fmmd_id==this.check_id)
                {
                  console.log(item.permission);
                  for(var i=0;i<item.permission.length;i++)
                  {
                    if(item.permission[i].usrl_id==data)
                    {
                      console.log(item.permission[i]);
                      item.permission[i].disable=true
                      item.permission[i].insert_column=true;
                      item.permission[i].read_only=false;

                      
                    }
                    
                  }
                  
                }
               })
            
            }
          }else
          {
            xyz.update_column=false
            if(xyz.update_column==false)
            {
              xyz.read_only=true
              this.formData.map((item:any)=>{
                if(item.fmmd_id==this.check_id)
                {
                  console.log(item.permission);
                  for(var i=0;i<item.permission.length;i++)
                  {
                    if(item.permission[i].usrl_id==data)
                    {
                      console.log(item.permission[i]);
                      item.permission[i].disable=false
                      
                    }
                    
                  }
                  
                }
               })
            }
          }
        }
        else if(ac=="R")
        {
          xyz.usrl_id=data
          xyz.col_id=this.check_id
          if(event.target.checked==true)
          {
            xyz.read_only=true
            if(xyz.update_column==true)
            {
              xyz.read_only=false


            }
          }else
          {
            xyz.read_only=false
            if(xyz.read_only==false)
            {
              xyz.update_column=true;
            }
          }
        }
        this.abc.push(xyz)
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
        console.log(element.col_id);
        arr.push({
              "fmmd_id":element.col_id,
              "permission":[{
                "usrl_id": element.usrl_id,
                "insert_column": element.insert_column,
                "update_column": element.update_column,
                "read_only": element.read_only
              }]
            })
      });
    }
      let apiFormat={
      "fields":arr
    }
    this.matDialog.open(ModalalertComponent,{data:apiFormat,disableClose: true})
 
    // console.log(arr);
    
  

    

    
  }
  savedata(fmmd_id:any)
  {
    console.log(this.abc);

    var data=this.abc.filter((item:any)=>{
      return item.col_id==fmmd_id
    })
    console.log(data);

 if(this.applyobjformat.length!=0)
 {
  for(var i=0;i<this.applyobjformat.length;i++)
  {
    for(var j=0;j<this.applyobjformat[i].length;j++)
    {
      if(this.applyobjformat[i][j].col_id===fmmd_id)
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
  if(item.fmmd_id==fmmd_id)
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
