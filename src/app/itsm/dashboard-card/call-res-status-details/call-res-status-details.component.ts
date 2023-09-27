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
  selector: 'app-call-res-status-details',
  templateUrl: './call-res-status-details.component.html',
  styleUrls: ['./call-res-status-details.component.css']
})
export class CallResStatusDetailsComponent {
  formData: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pagination: any;
  selection = new SelectionModel<any>(true, []);
  private formListSubscription: Subscription = new Subscription();
  tabledata: any = [{
    "ticket_no": "INC-550021",
    "inid_id": "550021",
    "emp_name": "Nikhil Chavan",
    "dept": "it",
    "problem": "Keyboard / Mouse Not Working",
    "problem_summary": "enter key not working",
    "engineer": "Rahul Wanjale",
    "call_status": "Resolved",
    "log_time": "04-09-2023 10:54:55",
    "action_taken": null,
    "asset_category": "HARDWARE",
    "priority": "High",
    "support_group": "IT Support",
    "callmode": "Mail",
    "inrm_id": "201",
    "responsemode": "E-mail",
    "category": "INCIDENT",
    "created": "2023-09-04T00:00:00.000Z"
  },
  {
    "ticket_no": "INC-550022",
    "inid_id": "550022",
    "emp_name": "Nikhil Chavan",
    "dept": "it",
    "problem": "Monitor Not Working",
    "problem_summary": "monitor not turning on",
    "engineer": "Rahul Wanjale",
    "call_status": "Resolved",
    "log_time": "04-09-2023 11:00:54",
    "action_taken": null,
    "asset_category": "HARDWARE",
    "priority": "High",
    "support_group": "IT Support",
    "callmode": "Mail",
    "inrm_id": "201",
    "responsemode": "E-mail",
    "category": "INCIDENT",
    "created": "2023-09-04T00:00:00.000Z"
  },
  {
    "ticket_no": "INC-550023",
    "inid_id": "550023",
    "emp_name": "Nikhil Chavan",
    "dept": "it",
    "problem": "MS Teams Issue",
    "problem_summary": "teams not opening",
    "engineer": "Rahul Wanjale",
    "call_status": "Resolved",
    "log_time": "04-09-2023 12:59:19",
    "action_taken": null,
    "asset_category": "HARDWARE",
    "priority": "Medium",
    "support_group": "IT Support",
    "callmode": "Mail",
    "inrm_id": "201",
    "responsemode": "E-mail",
    "category": "INCIDENT",
    "created": "2023-09-04T00:00:00.000Z"
  },
  {
    "ticket_no": "REQ-550004",
    "inid_id": "550004",
    "emp_name": "Chandralok Pandey",
    "dept": "it",
    "problem": "Antivirus Issue",
    "problem_summary": "my laptop is hanging",
    "engineer": "Rahul Wanjale",
    "call_status": "Assigned",
    "log_time": "18-08-2023 12:07:45",
    "action_taken": null,
    "asset_category": "HARDWARE",
    "priority": "Medium",
    "support_group": "IT Support",
    "callmode": "Web",
    "inrm_id": "201",
    "responsemode": "Remote Session of Requestors Device",
    "category": "REQUEST",
    "created": "2023-08-18T00:00:00.000Z"
  }];
  displayedColumns: string[] = ['problem','ticket_no','emp_name','support_group','log_time','engineer','priority','callmode'];

  isMenuOpened: boolean = false;
  value: any;
  length = 32;
  callResponseModeDetails:any=[];
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
  callResponse:any;
  constructor(private route:ActivatedRoute) { }
  ngOnInit(): void {
    debugger
    this.paramData = this.route.snapshot.params;
    this.callResponse=this.paramData['responseMode'];
    this.getCallResponseDetails(this.callResponse);
  
  }

  getCallResponseDetails(data:any){
    debugger
    this.tabledata.forEach((element:any )=> {
      if(element.responsemode === data){  
        this.callResponseModeDetails.push(element);
      }
      this.dataSource = new MatTableDataSource(this.callResponseModeDetails);
      this.excel = this.callResponseModeDetails;
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
