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
  selector: 'app-asset-location-details',
  templateUrl: './asset-location-details.component.html',
  styleUrls: ['./asset-location-details.component.css']
})
export class AssetLocationDetailsComponent {
  formData: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pagination: any;
  selection = new SelectionModel<any>(true, []);
  private formListSubscription: Subscription = new Subscription();
  tabledata: any = [{
    "astd_id": "500028",
    "owner_name": "Nikhil  Chavan",
    "empid": "AT129",
    "assetno": "MON-001",
    "serialno": "47499393",
    "status": "IN USE",
    "location": "ISpace Third"
  },
  {
    "astd_id": "500018",
    "owner_name": "Avinash  Aradhye",
    "empid": "OTWPUN101",
    "assetno": "hgfgh676",
    "serialno": null,
    "status": "IN USE",
    "location": "ISpace Third"
  },
  {
    "astd_id": "500025",
    "owner_name": "Avinash  Aradhye",
    "empid": "OTWPUN101",
    "assetno": "dasda44242",
    "serialno": null,
    "status": "IN-TRANSIT",
    "location": "ISpace Third"
  },
  {
    "astd_id": "500023",
    "owner_name": "Nikhil  Chavan",
    "empid": "AT129",
    "assetno": "HPkeyboard001",
    "serialno": null,
    "status": "IN USE",
    "location": "ISpace Third"
  },
  {
    "astd_id": "500019",
    "owner_name": "Avinash  Aradhye",
    "empid": "OTWPUN101",
    "assetno": "dfsdsf434",
    "serialno": null,
    "status": "IN USE",
    "location": "ISpace Third"
  },
  {
    "astd_id": "500024",
    "owner_name": "Avinash  Aradhye",
    "empid": "OTWPUN101",
    "assetno": "dsadsad",
    "serialno": null,
    "status": "IN-TRANSIT",
    "location": "ISpace Third"
  },
  {
    "astd_id": "500001",
    "owner_name": "Nikhil  Chavan",
    "empid": "AT129",
    "assetno": "AUG-PUN-AT129",
    "serialno": null,
    "status": "IN USE",
    "location": "ISpace Third"
  },
  {
    "astd_id": "500020",
    "owner_name": "Avinash  Aradhye",
    "empid": "OTWPUN101",
    "assetno": "fbfb545",
    "serialno": null,
    "status": "IN USE",
    "location": "ISpace Third"
  },
   {
    "astd_id": "500003",
    "owner_name": "Chandralok  Pandey",
    "empid": "AT122",
    "assetno": "Chandralok",
    "serialno": null,
    "status": "IN USE",
    "location": "Shivaneri First"
  },
  {
    "astd_id": "500004",
    "owner_name": "Swapneel  Kamble",
    "empid": "AT142",
    "assetno": "DESKTOP-6E1M3RO",
    "serialno": null,
    "status": "IN USE",
    "location": "Shivaneri First"
  },
  ];
  displayedColumns: string[] = ['asset_no', 'empid', 'owner_name', 'location', 'serialno', 'status'];

  isMenuOpened: boolean = false;
  value: any;
  length = 32;
  assetLocationDetails: any = [];
  excel: any;
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
  paramData: any;
  locationType: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.paramData = this.route.snapshot.params;
    this.locationType = this.paramData['title'];
    this.getAssetLocationDetails(this.locationType);

  }

  getAssetLocationDetails(data: any) {
    this.assetLocationDetails = [];
    this.tabledata.forEach((element: any) => {
      if (element.location === data) {
        this.assetLocationDetails.push(element);
      }
      this.dataSource = new MatTableDataSource(this.assetLocationDetails);
      this.excel = this.assetLocationDetails;
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
    XLSX.writeFile(wb, "AssetLocation_Details_Report.xlsx");
  }
}
