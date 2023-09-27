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
  selector: 'app-asset-type-details',
  templateUrl: './asset-type-details.component.html',
  styleUrls: ['./asset-type-details.component.css']
})
export class AssetTypeDetailsComponent {
  formData: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pagination: any;
  selection = new SelectionModel<any>(true, []);
  private formListSubscription: Subscription = new Subscription();
  tabledata: any = [{
    "astd_id": "500025",
    "owner_name": "Avinash  Aradhye",
    "empid": "OTWPUN101",
    "assetno": "dasda44242",
    "serialno": null,
    "status": "IN-TRANSIT",
    "astg_group": "DESKTOP"
  },
  {
    "astd_id": "500021",
    "owner_name": "Zenil  Bulsara",
    "empid": "OTWMUM518",
    "assetno": "tgyut676",
    "serialno": null,
    "status": "MISSING",
    "astg_group": "DESKTOP"
  },
  {
    "astd_id": "500003",
    "owner_name": "Chandralok  Pandey",
    "empid": "AT122",
    "assetno": "Chandralok",
    "serialno": null,
    "status": "IN USE",
    "astg_group": "LAPTOP"
  },
  {
    "astd_id": "500018",
    "owner_name": "Avinash  Aradhye",
    "empid": "OTWPUN101",
    "assetno": "hgfgh676",
    "serialno": null,
    "status": "IN USE",
    "astg_group": "LAPTOP"
  },
  {
    "astd_id": "500004",
    "owner_name": "Swapneel  Kamble",
    "empid": "AT142",
    "assetno": "DESKTOP-6E1M3RO",
    "serialno": null,
    "status": "IN USE",
    "astg_group": "LAPTOP"
  },
  {
    "astd_id": "500028",
    "owner_name": "Nikhil  Chavan",
    "empid": "AT129",
    "assetno": "MON-001",
    "serialno": "47499393",
    "status": "IN USE",
    "astg_group": "MONITOR"
  },
  {
    "astd_id": "500023",
    "owner_name": "Nikhil  Chavan",
    "empid": "AT129",
    "assetno": "HPkeyboard001",
    "serialno": null,
    "status": "IN USE",
    "astg_group": "ACCESSORIES"
  },
  {
    "astd_id": "500027",
    "owner_name": "Chaitanya  Mirpagar",
    "empid": "AT136",
    "assetno": "SVR-001",
    "serialno": null,
    "status": "IN USE",
    "astg_group": "SERVER"
  }
  ];
  displayedColumns: string[] = ['empid','owner_name','assetno', 'serialno', 'status'];

  isMenuOpened: boolean = false;
  value: any;
  length = 32;
  assetTypeDetails: any = [];
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
  assetType: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.paramData = this.route.snapshot.params;
    this.assetType = this.paramData['title'];
    this.getAssetLocationDetails(this.assetType);

  }

  getAssetLocationDetails(data: any) {
    this.assetTypeDetails = [];
    this.tabledata.forEach((element: any) => {
      if (element.astg_group === data) {
        this.assetTypeDetails.push(element);
      }
      this.dataSource = new MatTableDataSource(this.assetTypeDetails);
      this.excel = this.assetTypeDetails;
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
    XLSX.writeFile(wb, "AssetType_Details_Report.xlsx");
  }
}
