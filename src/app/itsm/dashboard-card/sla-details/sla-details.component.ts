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
  selector: 'app-sla-details',
  templateUrl: './sla-details.component.html',
  styleUrls: ['./sla-details.component.css']
})
export class SlaDetailsComponent {
  formData: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  pagination: any;
  selection = new SelectionModel<any>(true, []);
  private formListSubscription: Subscription = new Subscription();
  tabledata: any=[
    {
      "slaType": "Within SLA",
      "ticket_no": "INC-550023",
      "created": "2023-09-04",
      "employee_name": "Nikhil Chavan",
      "dept": "it",
      "problem": "MS Teams Issue",
      "problem_summary": "teams not opening",
      "engineer": "Rahul Wanjale",
      "call_status": "Resolved",
      "log_time": "04-09-2023 12:59:19",
      "action_taken": null,
      "asset_category": "HARDWARE",
      "asset_group": "LAPTOP",
      "inpr_id": "551003",
      "priority": "Medium",
      "support_group": "IT Support",
      "callmode": "Mail",
      "responsemode": "E-mail",
      "intp_id": "301",
      "category": "INCIDENT",
      "month": "september",
      "quarter": 3,
      "year": 2023,
      "createdtime": "2023-09-04T12:59:19.238Z",
      "calltime_hrs": 0,
      "standerdsla_hrs": "24"
  },
  {
    "slaType": "Within SLA",
      "ticket_no": "INC-550021",
      "created": "2023-09-04",
      "employee_name": "Nikhil Chavan",
      "dept": "it",
      "problem": "Keyboard / Mouse Not Working",
      "problem_summary": "enter key not working",
      "engineer": "Rahul Wanjale",
      "call_status": "Resolved",
      "log_time": "04-09-2023 10:54:55",
      "action_taken": null,
      "asset_category": "HARDWARE",
      "asset_group": "ACCESSORIES",
      "inpr_id": "551002",
      "priority": "High",
      "support_group": "IT Support",
      "callmode": "Mail",
      "responsemode": "E-mail",
      "intp_id": "301",
      "category": "INCIDENT",
      "month": "september",
      "quarter": 3,
      "year": 2023,
      "createdtime": "2023-09-04T10:54:55.903Z",
      "calltime_hrs": 2,
      "standerdsla_hrs": "2"
  },
  {
    "slaType": "Out of SLA",
    "ticket_no": "REQ-550017",
    "created": "2023-09-01",
    "employee_name": "Nikhil Chavan",
    "dept": "it",
    "problem": "Data Recovery",
    "problem_summary": "test it ",
    "engineer": "Nikhil Chavan",
    "call_status": "Resolved",
    "log_time": "01-09-2023 16:21:22",
    "action_taken": null,
    "asset_category": "HARDWARE",
    "asset_group": "LAPTOP",
    "inpr_id": "551004",
    "priority": "Low",
    "support_group": "IT Support",
    "callmode": "Mail",
    "responsemode": "Taking Requesters device to ITM",
    "intp_id": "302",
    "category": "REQUEST",
    "month": "september",
    "quarter": 3,
    "year": 2023,
    "createdtime": "2023-09-01T16:21:22.140Z",
    "calltime_hrs": 69,
    "standerdsla_hrs": "48"
}];
displayedColumns: string[] = ['ticket_no', 'problem', 'employee_name', 'log_time', 'engineer', 'call_status', 'priority'];

  isMenuOpened: boolean = false;
  value: any;
  length = 32;
  slaDetails:any=[];
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
  slaType:any;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.paramData = this.route.snapshot.params;
    this.slaType=this.paramData['title'];
    this.getSLADetails(this.slaType);
  
  }

  getSLADetails(data:any){
     this.slaDetails=[];
     this.tabledata.forEach((element:any )=> {
      if(element.slaType === data){  
        this.slaDetails.push(element);
      }
      this.dataSource = new MatTableDataSource(this.slaDetails);
      this.excel = this.slaDetails;
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
    XLSX.writeFile(wb, "SLA_Details_Report.xlsx");
  }
}
