import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-call-mode-status-details',
  templateUrl: './call-mode-status-details.component.html',
  styleUrls: ['./call-mode-status-details.component.css']
})
export class CallModeStatusDetailsComponent {
  formData: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  pagination: any;
  selection = new SelectionModel<any>(true, []);
  private formListSubscription: Subscription = new Subscription();
  tabledata: any=[
     {
    "ticket_no": "INC-550036",
    "inid_id": "550036",
    "emp_name": "Swapneel Kamble",
    "dept": "it",
    "problem": "Antivirus Issue",
    "problem_summary": "antivirus issue",
    "engineer": null,
    "call_status": "New",
    "log_time": "06-09-2023 16:04:17",
    "action_taken": null,
    "category": "HARDWARE",
    "priority": "High",
    "support_group": "IT Support",
    "incm_id": "101",
    "callmode": "Mail",
    "responsemode": null,
    "created": "2023-09-06T00:00:00.000Z",
    "month": "September",
    "quarter": 3,
    "year": 2023
},
{
    "ticket_no": "INC-550038",
    "inid_id": "550038",
    "emp_name": "Swapneel Kamble",
    "dept": "it",
    "problem": "Antivirus Issue",
    "problem_summary": "antivirus issue",
    "engineer": null,
    "call_status": "New",
    "log_time": "06-09-2023 16:58:09",
    "action_taken": null,
    "category": "HARDWARE",
    "priority": "High",
    "support_group": "IT Support",
    "incm_id": "101",
    "callmode": "Mail",
    "responsemode": null,
    "created": "2023-09-06T00:00:00.000Z",
    "month": "September",
    "quarter": 3,
    "year": 2023
},
{
    "ticket_no": "INC-550039",
    "inid_id": "550039",
    "emp_name": "Nikhil Chavan",
    "dept": "it",
    "problem": "Common Drive Issue",
    "problem_summary": "antivirus issue",
    "engineer": null,
    "call_status": "New",
    "log_time": "06-09-2023 17:01:55",
    "action_taken": null,
    "category": "HARDWARE",
    "priority": "High",
    "support_group": "IT Support",
    "incm_id": "101",
    "callmode": "Mail",
    "responsemode": null,
    "created": "2023-09-06T00:00:00.000Z",
    "month": "September",
    "quarter": 3,
    "year": 2023
},
{
    "ticket_no": "INC-550031",
    "inid_id": "550031",
    "emp_name": "Chandralok Pandey",
    "dept": "it",
    "problem": "Activity Call",
    "problem_summary": "activity",
    "engineer": null,
    "call_status": "New",
    "log_time": "06-09-2023 14:37:06",
    "action_taken": null,
    "category": "HARDWARE",
    "priority": "High",
    "support_group": "IT Support",
    "incm_id": "101",
    "callmode": "Web",
    "responsemode": null,
    "created": "2023-09-06T00:00:00.000Z",
    "month": "September",
    "quarter": 3,
    "year": 2023
},
{
    "ticket_no": "INC-550032",
    "inid_id": "550032",
    "emp_name": "Aman Paswan",
    "dept": "it",
    "problem": "CCTV Camera Issue",
    "problem_summary": "cctv camera is not working",
    "engineer": null,
    "call_status": "New",
    "log_time": "06-09-2023 14:41:39",
    "action_taken": null,
    "category": "HARDWARE",
    "priority": "High",
    "support_group": "IT Support",
    "incm_id": "101",
    "callmode": "Web",
    "responsemode": null,
    "created": "2023-09-06T00:00:00.000Z",
    "month": "September",
    "quarter": 3,
    "year": 2023
}];
displayedColumns: string[] = ['problem','ticket_no','emp_name','support_group','log_time','engineer','priority','callmode'];

  isMenuOpened: boolean = false;
  value: any;
  length = 32;
  callModeDetails:any=[];
  excel:any;
  pageSize = 8;
  pageSizeOptions: number[] = [8, 16, 24, 32];
  assetid: any;
  month: any;
  days: any
  incm_id: any;
  paramLength: any;
  sdate: any;
  edate: any;
  parameter: any;
  paramData:any;
  callMode:any;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    debugger
    this.paramData = this.route.snapshot.params;
    this.callMode=this.paramData['title'];
    this.getCallModeStatusDetails(this.callMode);
  
  }

  getCallModeStatusDetails(data:any){
    debugger
    this.tabledata.forEach((element:any )=> {
      if(element.callmode === data){  
        this.callModeDetails.push(element);
      }
      this.dataSource = new MatTableDataSource(this.callModeDetails);
      this.excel = this.callModeDetails;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     });
      
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
  exportAsXLSX() {
    // console.log('llll',this.data1);
    var ws = XLSX.utils.json_to_sheet(this.excel);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "Pendingstatus_Details_Report.xlsx");
  }
}
