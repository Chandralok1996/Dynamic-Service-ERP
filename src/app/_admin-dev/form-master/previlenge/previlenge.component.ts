import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdminService, AppService, ToasterService } from 'src/app/_services';

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
      "insert_column": true,
      "update_column":false,
      "read_only": false,
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
  constructor(private adminService: AdminService, private toaster: ToasterService, private service: AppService) {
    this.pagination = this.service.pagination;
    this.getFormDataById(50001);
  }
  ngOnInit(): void {
    
  }
  getFormDataById(id: number): void {
      this.adminService.getFormByID(id).subscribe((res: any) => {
        if (res.status == 200) {
          this.formData = res.rows;
          console.table(this.formData);
     
          
       
          var role=this.formData.filter((item:any)=>{
            return item.column_label=="User Role"
          })

          console.log(role);
          this.roleobject=role[0].column_value
          console.log(this.roleobject);
          
          var column=role[0].column_value
          var arr:any=[]
          var getcol=column.forEach((item:any)=>{
            arr.push(item.value)
          })
          console.log(arr);
          this.displayedColumns=this.displayedColumns.concat(arr);
          console.log(this.displayedColumns);
          this.displayedColumns.push('Action')
          
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
    console.log(event.target.checked);
    
   this.check_id=col.fmmd_id
    data=this.roleobject.filter((res:any)=>{
    return res.value==data
   })
   this.roleid=data   
   data=data[0].id
   this.roleid=this.roleid[0].value
  if(this.abc.length==0)
  {
    if(ac=="C")
    {
      this.dataFormat.usrl_id=data
      this.dataFormat.col_id=this.check_id
      if(event.target.checked==true)
      {
        this.dataFormat.insert_column=true
        if(this.dataFormat.update_column==true)
        {
          this.dataFormat.read_only=false;
          this.readonly=true;
        }

      }else
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
        if(this.dataFormat.insert_column==true)
        {
          this.dataFormat.read_only=false
          this.readonly=true;

        }
      }
      else{
        this.dataFormat.update_column=false

      }
    }
    else if(ac=="R")
    {
      this.dataFormat.usrl_id=data
      this.dataFormat.col_id=this.check_id

      if(event.target.checked==true)
      {
        if(this.dataFormat.insert_column==true && this.dataFormat.update_column==true)
        {
          this.dataFormat.read_only=false
          this.readonly=true;

        }
        else
        {
          this.dataFormat.read_only=true
        }

      }
      else
      {
        this.dataFormat.read_only=false

      }
    }
    this.abc.push(this.dataFormat)
    console.log(this.abc);
    
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
  //for update particular role
      if(check.length!=0)
      {
        // var obj=this.abc.filter((item:any)=>{
        //   return item.col_id==this.check_id
        // })
        // console.log(obj);
        
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
              this.readonly=true;

            }

          }
          else
          {
            this.abc[index].insert_column=false

          }
        }else if(ac=="U")
        {
          this.abc[index].usrl_id
          this.abc[index].col_id=this.check_id

          if(event.target.checked==true)
          {
            this.abc[index].update_column=true
            if(this.abc[index].insert_column==true)
            {
              this.abc[index].read_only=false
              this.readonly=true;


            }

          }
          else{
            this.abc[index].update_column=false

          }
        }
        else if(ac=="R")
        {
          this.abc[index].usrl_id
          this.abc[index].col_id=this.check_id

          if(event.target.checked==true)
          {
            if(this.abc[index].insert_column==true && this.abc[index].update_column==true)
            {
              this.abc[index].read_only=false
              this.readonly=true;

            }
            else
            {
              this.abc[index].read_only=true
            }

          }
          else
          {
            this.abc[index].read_only=false

          }
        }
      }
      else
      {
        var xyz={
          "usrl_id":"",
          "insert_column": true,
          "update_column":false,
          "read_only": false,
          "col_id":this.check_id
        }
        if(ac=="C")
        {
          console.log("c");
          xyz.usrl_id=data
          if(event.target.checked==true)
          {
            xyz.insert_column=true

          }
          else
          {
            xyz.insert_column=false
          }
          
        }
        else if(ac=="U")
        {
          console.log("u");
          xyz.usrl_id=data
          if(event.target.checked==true)
          {
            xyz.update_column=true

          }
          else
          {
            xyz.update_column=false

          }
           
        }
        else if(ac=="R")
        {
          console.log("R");
          xyz.usrl_id=data
          if(event.target.checked==true)
          {
            xyz.read_only=true
          }
          else
          {
            xyz.read_only=false
          }
          
        }
        this.abc.push(xyz)
      }

     
    console.log(this.abc);
    
  }

   
   
   
    
  
  }
  savedata(fmm_id:any)
  {
    console.log(this.abc);
    var data=this.abc.filter((item:any)=>{
      return item.col_id==fmm_id
    })
    console.log(data);
    if(data.length==0)
    {
      this.toaster.error("You have not select any previlenge")
    }
    else
    {
      var apiFormat:any={
        "fields":[
{
  "fmmd_id":data[0].col_id,
  "permission":""
}
        ]
      }
     data.forEach((item:any)=>{
      Reflect.deleteProperty(item, 'col_id');
     })
     apiFormat.fields[0].permission=data
     console.log(apiFormat)
     this.getFormDataById(50001);

     this.adminService.applyprevilenge(apiFormat).subscribe((res:any)=>{
console.log(res)
     },
     (error:any) => {                              //Error callback
this.toaster.error(error.message)

      //throw error;   //You can also throw the error to a global error handler
    }
     
     ),

      this.toaster.success("Added Previlenge!")
    }
    // if(this.check_id=="")
    // {
    //   alert("select previlenge")
    // }
    // else 
    // {
    //   this.apiFormat[0].fmmd_id=fmm_id
    //   this.apiFormat[0].permission=this.abc
    //   console.log(this.apiFormat);
    //   var format={
    //     "fields":this.apiFormat
    //   }
    //   this.adminService.applyprevilenge(format).subscribe((res:any)=>{
    //     this.toaster.warning(res.message)
    //   },
    //   (error: any) => {
    //     this.toaster.error(error.message);
      
    // })
    // }


    
  }
}
