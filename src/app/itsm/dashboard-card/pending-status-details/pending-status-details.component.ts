import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService, ToasterService } from 'src/app/_services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pending-status-details',
  templateUrl: './pending-status-details.component.html',
  styleUrls: ['./pending-status-details.component.css']
})
export class PendingStatusDetailsComponent {
  formData: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  pagination: any;
  selection = new SelectionModel<any>(true, []);
  tabledata: any = [
    {

      "ticket_no": "INC-550021",

      "emp_name": "Nikhil Chavan",

      "dept": "it",

      "problem": "Keyboard / Mouse Not Working",

      "problem_summary": "enter key not working",

      "engineer": "Rahul Wanjale",

      "inst_id": "555006",

      "call_status": "Resolved",

      "log_time": "04-09-2023 10:54:55",

      "action_taken": null,

      "asset_category": "HARDWARE",

      "priority": "High",

      "support_group": "IT Support",

      "incm_id": "101",

      "callmode": "Mail",

      "responsemode": "E-mail",

      "category": "INCIDENT",

      "created": "2023-09-04T00:00:00.000Z",

      "inid_id": "550030"

  },
  {

    "ticket_no": "INC-550021",

    "emp_name": "Nikhil Chavan",

    "dept": "it",

    "problem": "Keyboard / Mouse Not Working",

    "problem_summary": "enter key not working",

    "engineer": "Rahul Wanjale",

    "inst_id": "555006",

    "call_status": "Resolved",

    "log_time": "04-09-2023 10:54:55",

    "action_taken": null,

    "asset_category": "HARDWARE",

    "priority": "High",

    "support_group": "IT Support",

    "incm_id": "101",

    "callmode": "Mail",

    "responsemode": "E-mail",

    "category": "INCIDENT",

    "created": "2023-09-04T00:00:00.000Z",

    "inid_id": "550029"

},
{

  "ticket_no": "INC-550021",

  "emp_name": "Nikhil Chavan",

  "dept": "it",

  "problem": "Keyboard / Mouse Not Working",

  "problem_summary": "enter key not working",

  "engineer": "Rahul Wanjale",

  "inst_id": "555006",

  "call_status": "Resolved",

  "log_time": "04-09-2023 10:54:55",

  "action_taken": null,

  "asset_category": "HARDWARE",

  "priority": "High",

  "support_group": "IT Support",

  "incm_id": "101",

  "callmode": "Mail",

  "responsemode": "E-mail",

  "category": "INCIDENT",

  "created": "2023-09-04T00:00:00.000Z",

  "inid_id": "550028"

},
  {

      "ticket_no": "INC-550022",

      "emp_name": "Nikhil Chavan",

      "dept": "it",

      "problem": "Monitor Not Working",

      "problem_summary": "monitor not turning on",

      "engineer": "Rahul Wanjale",

      "inst_id": "555006",

      "call_status": "New",

      "log_time": "04-09-2023 11:00:54",

      "action_taken": null,

      "asset_category": "HARDWARE",

      "priority": "High",

      "support_group": "IT Support",

      "incm_id": "101",

      "callmode": "Mail",

      "responsemode": "E-mail",

      "category": "INCIDENT",

      "created": "2023-09-04T00:00:00.000Z",

      "inid_id": "550022"

  },

  {

      "ticket_no": "INC-550023",

      "emp_name": "Nikhil Chavan",

      "dept": "it",

      "problem": "MS Teams Issue",

      "problem_summary": "teams not opening",

      "engineer": "Rahul Wanjale",

      "inst_id": "555006",

      "call_status": "New",

      "log_time": "04-09-2023 12:59:19",

      "action_taken": null,

      "asset_category": "HARDWARE",

      "priority": "Medium",

      "support_group": "IT Support",

      "incm_id": "101",

      "callmode": "Mail",

      "responsemode": "E-mail",

      "category": "INCIDENT",

      "created": "2023-09-04T00:00:00.000Z",

      "inid_id": "550023"

  },
  {

    "ticket_no": "INC-550023",

    "emp_name": "Nikhil Chavan",

    "dept": "it",

    "problem": "MS Teams Issue",

    "problem_summary": "teams not opening",

    "engineer": "Rahul Wanjale",

    "inst_id": "555006",

    "call_status": "Assigned",

    "log_time": "04-09-2023 12:59:19",

    "action_taken": null,

    "asset_category": "HARDWARE",

    "priority": "Medium",

    "support_group": "IT Support",

    "incm_id": "101",

    "callmode": "Mail",

    "responsemode": "E-mail",

    "category": "INCIDENT",

    "created": "2023-09-04T00:00:00.000Z",

    "inid_id": "550023"

},
{

  "ticket_no": "INC-550023",

  "emp_name": "Nikhil Chavan",

  "dept": "it",

  "problem": "MS Teams Issue",

  "problem_summary": "teams not opening",

  "engineer": "Rahul Wanjale",

  "inst_id": "555006",

  "call_status": "Assigned",

  "log_time": "04-09-2023 12:59:19",

  "action_taken": null,

  "asset_category": "HARDWARE",

  "priority": "Medium",

  "support_group": "IT Support",

  "incm_id": "101",

  "callmode": "Mail",

  "responsemode": "E-mail",

  "category": "INCIDENT",

  "created": "2023-09-04T00:00:00.000Z",

  "inid_id": "550023"

}
  ];
  value: any;
  length = 32;
  pageSize = 8;
  pageSizeOptions: number[] = [8, 16, 24, 32];
tablePendingStatusDetails:any=[];
  excel: any;
  private formListSubscription: Subscription = new Subscription();
  // tempvar:any;
  // copyDisplayColumn: any;
  displayedColumns: string[] = ['problem', 'ticket_no', 'emp_name', 'support_group', 'log_time', 'engineer', 'priority', 'callmode'];
  // temparray:any=[]
  // userlistdata: any;
  // formID: any = 50001;
  // formlabel: any
  // formfield:any=[]
  // getkeys: any;
  // x: any=[];
  // orgkeys: any;
  status:any;

  constructor( 
    private toaster: ToasterService, 
    private service: AppService,
    private router:Router,
    private route: ActivatedRoute
    ) {
   // this.userCreated = JSON.parse(this.userCreated);
    this.pagination = this.service.pagination;
  }
  public hello: any;
  isMenuOpened: boolean = false;
  paramData:any;

  ngOnInit(): void {
    this.paramData = this.route.snapshot.params;
    this.status=this.paramData['status'];
   this.pendingStatusDetails(this.status);
  
  }

  pendingStatusDetails(data:any)
  {
    this.tablePendingStatusDetails=[];
    this.tabledata.forEach((element:any )=> {
    if(element.call_status === data){  
      this.tablePendingStatusDetails.push(element);
    }
    this.dataSource = new MatTableDataSource(this.tablePendingStatusDetails);
    this.excel = this.tablePendingStatusDetails;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   });
    
    
  }
//   selectlabel(event:any,data:any)
//   {
//     console.log(this.orgkeys);
//     var getorg:any=[]
//     for(var i=0;i<this.orgkeys.length;i++)
//     {
//       getorg.push(this.orgkeys[i].keyName)
//     }
//     console.log(getorg);
//     if(event.checked==true){

//       let getindex=getorg.indexOf(data.keyName)
//       console.log(getindex);
//                   this.x.splice(getindex, 0, data.keyName);
// this.displayedColumns=this.x
// console.log(this.displayedColumns);
// let actionind=this.displayedColumns.indexOf('Action')
// console.log(actionind);

// this.displayedColumns.splice(actionind,1)
// console.log(this.displayedColumns);

//         this.displayedColumns.push('Action');

//     }
//     else
//     {
//       //unchecked
//         let getindex=this.x.indexOf(data.keyName)
//         console.log(getindex);
//         this.x.splice(getindex,1)
//         this.displayedColumns=this.x

//         console.log(this.displayedColumns);
        
//                 // this.displayedColumns.push('Action');

//     }
//     // console.log(this.hello);
//     // this.hello=this.hello.filter((res:any)=>{
//     //   return res!="Action"
//     // })
//     // console.log(event.checked);
    
//     // if(event.checked==true)
//     // {
//     //    console.log(true);
//     //    console.log(data.keyName);
//     //    for(let x=0;this.temparray.length;x++)
//     //   {
//     //     this.temparray.splice(data.keyName,1)
//     //   }
//     //    this.temparray.splice(data.keyName,1)
//     //    for(let i=0;i<this.displayedColumns.length;i++)
//     //    {
//     //       if(this.displayedColumns[i]==data.keyName)
//     //       {
//     //         console.log("exits");

//     //         break
            
//     //       }
//     //       else
//     //       {
//     //         console.log("not exits");
//     //         for(let n=0;n<this.temparray.length;n++)
//     //         {
//     //           if(this.temparray[n]==data.keyName)
//     //           {
//     //               console.log("ehllo");
                  
//     //           }
//     //           else
//     //           {
//     //             this.temparray.push(data.keyName)

//     //           }
//     //         }

//     //         var checkindex=this.hello.indexOf(data.keyName)
//     //         this.displayedColumns.splice(checkindex, 0, data.keyName);
//     //         console.log(checkindex);
            
//     //         // this.displayedColumns.push(data.keyName)
//     //         // this.copyDisplayColumn=this.displayedColumns
//     //         break
//     //       }
//     //    }
        
//     // }
//     // else
//     // {
//     //   console.log(false);
       
//     //         this.temparray.push(data.keyName)

          
        
//     //   for(var i=0;i<this.temparray.length;i++)
//     //   {
//     //     // this.displayedColumns.splice(this.temparray[i],1)
//     //     // console.log(this.temparray[i]);
//     //     // this.displayedColumns.remove(this.temparray[i])
//     //     var index=  this.displayedColumns.indexOf(this.temparray[i])
//     //       if(index>-1)
//     //       {
//     //                 this.displayedColumns.splice(index,1)

//     //       }
//     //   }

//     // }
//     // console.log(this.hello);
    
//     // console.log(this.displayedColumns);
    
//     // this.copyDisplayColumn=this.displayedColumns
//     // console.log(this.temparray);
    
//   }

  // userupdate(data:any)
  // {
  //   console.log(data);
  //   this.router.navigate(['/user-master/update',data]);
  // }
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
  exportAsXLSX() {
    // console.log('llll',this.data1);
    var ws = XLSX.utils.json_to_sheet(this.excel);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "Pendingstatus_Details_Report.xlsx");
  }
}
