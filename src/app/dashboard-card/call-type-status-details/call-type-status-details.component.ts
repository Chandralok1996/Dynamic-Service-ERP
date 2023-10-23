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
  selector: 'app-call-type-status-details',
  templateUrl: './call-type-status-details.component.html',
  styleUrls: ['./call-type-status-details.component.css']
})
export class CallTypeStatusDetailsComponent {
  formData: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  pagination: any;
  selection = new SelectionModel<any>(true, []);
  private formListSubscription: Subscription = new Subscription();
  displayedColumns: string[] = ['problem', 'ticket_no', 'emp_name', 'support_group', 'log_time', 'engineer', 'priority', 'callmode'];
  isMenuOpened: boolean = false;
  value: any;
  length = 32;
  tabledata:any=[{
    "ticket_no": "REQ-550029",
    "inid_id": "550029",
    "emp_name": "Nikhil Chavan",
    "dept": "it",
    "problem": "Borrow Software",
    "problem_summary": "Borrow Software",
    "engineer": null,
    "call_status": "New",
    "log_time": "06-09-2023 13:29:23",
    "action_taken": null,
    "asset_category": "HARDWARE",
    "priority": "High",
    "support_group": "IT Support",
    "callmode": "Mail",
    "responsemode": null,
    "intp_id": "302",
    "category": "REQUEST",
    "created": "2023-09-06T00:00:00.000Z"
},
{
    "ticket_no": "REQ-550017",
    "inid_id": "550017",
    "emp_name": "Nikhil Chavan",
    "dept": "it",
    "problem": "Data Recovery",
    "problem_summary": "test it ",
    "engineer": "Nikhil Chavan",
    "call_status": "Resolved",
    "log_time": "01-09-2023 16:21:22",
    "action_taken": null,
    "asset_category": "HARDWARE",
    "priority": "Low",
    "support_group": "IT Support",
    "callmode": "Mail",
    "responsemode": "Taking Requesters device to ITM",
    "intp_id": "302",
    "category": "REQUEST",
    "created": "2023-09-01T00:00:00.000Z"
},
{
    "ticket_no": "INC-550011",
    "inid_id": "550011",
    "emp_name": "Aman Paswan",
    "dept": "it",
    "problem": "Activity Call",
    "problem_summary": "laptop hanging issue",
    "engineer": null,
    "call_status": "New",
    "log_time": "29-08-2023 09:22:50",
    "action_taken": null,
    "asset_category": "HARDWARE",
    "priority": "Low",
    "support_group": "IT Support",
    "callmode": "Web",
    "responsemode": null,
    "intp_id": "302",
    "category": "INCIDENT",
    "created": "2023-08-29T00:00:00.000Z"
},
{
    "ticket_no": "INC-550013",
    "inid_id": "550013",
    "emp_name": "Nikhil Chavan",
    "dept": "it",
    "problem": "Data Transfer to be done",
    "problem_summary": "done",
    "engineer": null,
    "call_status": "New",
    "log_time": "29-08-2023 10:26:04",
    "action_taken": null,
    "asset_category": "HARDWARE",
    "priority": "Medium",
    "support_group": "IT Support",
    "callmode": "Mail",
    "responsemode": null,
    "intp_id": "302",
    "category": "INCIDENT",
    "created": "2023-08-29T00:00:00.000Z"
},
{
    "ticket_no": "INC-550015",
    "inid_id": "550015",
    "emp_name": "Aman Paswan",
    "dept": "it",
    "problem": "Laptop Not Working",
    "problem_summary": "laptop issue",
    "engineer": null,
    "call_status": "New",
    "log_time": "29-08-2023 10:28:08",
    "action_taken": null,
    "asset_category": "HARDWARE",
    "priority": "Medium",
    "support_group": "IT Support",
    "callmode": "Web",
    "responsemode": null,
    "intp_id": "302",
    "category": "INCIDENT",
    "created": "2023-08-29T00:00:00.000Z"
}];
  callTypeDetails:any=[];
  excel:any;
  pageSize = 8;
  pageSizeOptions: number[] = [8, 16, 24, 32];
  assetid: any;
  month: any;
  days: any
  intp_id: any;
  paramLength: any;
  sdate: any;
  edate: any;
  parameter: any;
  paramData:any;
  calltype:any;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.paramData = this.route.snapshot.params;
    this.calltype=this.paramData['category'];
    this.getCallModeStatusDetails(this.calltype);
  
  }

  getCallModeStatusDetails(data:any){
    
    this.tabledata.forEach((element:any )=> {
      if(element.category === data){  
        this.callTypeDetails.push(element);
      }
      this.dataSource = new MatTableDataSource(this.callTypeDetails);
      this.excel = this.callTypeDetails;
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
