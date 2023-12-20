import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/_services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-housekeeping-request-details',
  templateUrl: './housekeeping-request-details.component.html',
  styleUrls: ['./housekeeping-request-details.component.css']
})
export class HousekeepingRequestDetailsComponent {
  formData: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  pagination: any;
  selection = new SelectionModel<any>(true, []);
  private formListSubscription: Subscription = new Subscription();
  displayedColumns: string[] = ['ticket_no','problem','Location','guestNm','mbNo','callType','Status'];
  isMenuOpened: boolean = false;
  value: any;
  length = 32;
  tabledata:any=[];
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
  reportData:any;
  status:any;
  sDate:any;
  eDate:any;
  reportStatusData:any=[];
  constructor(private route:ActivatedRoute,private adminService: AdminService,private router: Router) { }

  ngOnInit(): void {
    
    this.paramData = this.route.snapshot.params;
   this.status=this.paramData.label;
   this.days=this.paramData.days;
   this.sDate=this.paramData.sDate;
   this.eDate=this.paramData.eDate;
   this.getReportData('hk',this.days,this.sDate,this.eDate);
  }
  getReportData(data: any, days: any, sDate: any, eDate: any) {
    ;
    this.reportData = [];
   this.reportStatusData=[];
      this.adminService
        .getReportData(data, days, sDate, eDate)
        .subscribe((res: any) => {
          console.log(res);
          this.reportData = res.result;
          if (this.reportData.length != 0) {
            if(this.status == 'Closed'){
              this.reportStatusData = this.reportData[2].hkListClosed;
            }
            else if(this.status == 'Opened'){
              this.reportStatusData = this.reportData[1].hkListOpened;
            }
            else if(this.status == 'In Progress'){
              this.reportStatusData = this.reportData[3].hkListInProgress;
            }
            
            this.dataSource = new MatTableDataSource(this.reportStatusData);
            this.excel = this.reportStatusData;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
         
        });
   
  }
  // getCallModeStatusDetails(data:any){
    
  //   this.tabledata.forEach((element:any )=> {
  //     if(element.category === data){  
  //       this.callTypeDetails.push(element);
  //     }
  //     this.dataSource = new MatTableDataSource(this.callTypeDetails);
  //     this.excel = this.callTypeDetails;
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  //    });
      
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
    XLSX.writeFile(wb, "Statuswise_HousekeepingTicket_Report.xlsx");
  }










}
