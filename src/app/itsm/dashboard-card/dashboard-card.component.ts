import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { SelectionModel } from "@angular/cdk/collections";
import { HttpParams } from "@angular/common/http";
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  registerables,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { MatDialog } from "@angular/material/dialog";
import { AdminService, AppService, ToasterService } from "src/app/_services";

@Component({
  selector: "app-dashboard-card",
  templateUrl: "./dashboard-card.component.html",
  styleUrls: ["./dashboard-card.component.css"],
})
export class DashboardCardComponent {
  @ViewChild("housekeepingChart1", { static: true }) housekeepingChart1: any;
  @ViewChild("mychart", { static: true }) mychart: any;
  @ViewChild("HRChart1", { static: true }) HRChart1: any;
  @ViewChild("assetCategoryWise1", { static: true }) assetCategoryWise1: any;
  @ViewChild("assetCallType1", { static: true }) assetCallType1: any;
  @ViewChild("assetCallMode1", { static: true }) assetCallMode1: any;
  links = [
    { type: "IT", value: "it" },
    { type: "Housekeeping", value: "hk" },
    { type: "HR", value: "hr" },
  ];
  activeLink = "it";
  background: any = "";
  hkBarChart: boolean = false;
  //for ngx charts
  name = "Angular";
  single: any = [];
  multi: any = [];
  view: any = [700, 400];
  value: any;
  assetCategoryWise: any;
  callStatus: any = [];
  modeofLoc = "Quarter 1";
  form: any;
  form5!: FormGroup;
  loading = false;
  submitted = false;
  assetCallType: any;
  assetCallMode: any;
  currentDate = new Date();
  currentMonthString = Math.floor(this.currentDate.getMonth() / 3) + 1;
  currentYearString = this.currentDate.getFullYear();
  event: any;
  //pensingStatus: any;
  resStatus: any;
  sDate = "";
  eDate = "";
  error: any;
  isShow: boolean = false;
  count: any;
  showdate5: boolean = false;
  showdate6: boolean = false;
  days: any = 1;
  canvas: any;
  ctx: any;
  showForIT: boolean = false;
  housekeepingChart: any;
  HRChart: any;
  callTypeChart: any;
  dataset1: any;
  housekeepingChartLabel: any = ["Opened", "Closed", "In Progress"];
  houseKeepingCount: any = [];
  houseKeepingData: any = [];
  houseKeepingOpenedData: any = [];
  houseKeepingClosedData: any = [];
  houseKeepingInProgressData: any = [];
  HRChartLabel: any = ["Opened", "Closed", "In Progress"];
  HRCount: any = [];
  HRData: any = [];
  HROpenedData: any = [];
  HRClosedData: any = [];
  HRInProgressData: any = [];
  showHousekeeping: boolean = false;
  showHR: boolean = false;
  reportData: any;
  dataset2: any;
  reportData1: any = [];
  dataset3: any = [];
  ITCount: any = [];
  ITOpenedData: any = [];
  ITClosedData: any = [];
  categoryReportData: any = [];
  ITInProgressData: any = [];
  currentDataset: any;
  requestName = "";
  opacityCallType = 0;
  assetCategoryWiseLabel = ["Hardware", "Software"];
  assetCallTypeWiseLabel = ["Incident", "Request"];
  assetCallModeWiseLabel = ["Web", "Mobile App"];
  assetCategoryWiseCount: any = [];
  assetCallTypeWiseCount: any = [];
  assetCallModeWiseCount: any = [];
  categorySoftware: any = [];
  categoryHardware: any = [];
  type: any = "it";
  selected = "7";
  callTypeRequest: any = [];
  callTypeRequestCount = 0;
  callTypeIncidentCount = 0;
  opacityCallMode = 0;
  callTypeIncident: any = [];
  selected1 = "7";
  selected2 = "7";
  showdate7: boolean = false;
  callModeWeb: any = [];
  callModeMobile: any = [];
  callModeWebCount = 0;
  callModeMobileCount = 0;
  ITData: any;
  showForHK: boolean = false;
  showForHR: boolean = false;
  reportData3: any = [];
  opacityCategory = 0;
  callTypeReportData: any = [];
  callModeReportData: any = [];
  categoryHardwareCount = 0;
  categorySoftwareCount = 0;
  reportData2: any = [];
  daysData = [
    { value: "7", name: "Last 7 Days" },
    { value: "14", name: "Last 14 Days" },
    { value: "", name: "Select Date" },
  ];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {
    Chart.register(
      ...registerables,
      BarElement,
      BarController,
      CategoryScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip
    );
  }

  ngOnInit(): void {
    this.form5 = this.formBuilder.group({
      sDate: ["", Validators.required],
      eDate: ["", Validators.required],
    });
    // this.form4 = this.formBuilder.group({
    //   sDate: ["", Validators.required],
    //   eDate: ["", Validators.required],
    // });
    this.getReportData(this.type, this.selected, this.sDate, this.eDate);
  }

  getReportData(data: any, days: any, sDate: any, eDate: any) {
    debugger;
    this.reportData = [];
    this.reportData1 = [];
    this.reportData2 = [];
    this.reportData3 = [];
    this.callTypeReportData = [];
    this.callModeReportData = [];
    this.assetCategoryWiseCount = [];
    this.categoryReportData = [];
    this.assetCallTypeWiseCount = [];
    this.assetCallModeWiseCount = [];

    this.requestName = "";
    if (data == "it") {
      this.opacityCategory = 1;
      this.opacityCallType = 1;
      this.opacityCallMode = 1;
      this.showForIT = true;
      this.showForHK = false;
      this.showForHR = false;
      this.ITData = [];
      this.ITCount = [];
      this.adminService
        .getReportData(data, days, sDate, eDate)
        .subscribe((res: any) => {
          console.log(res);
          this.reportData = res.result;
          this.reportData1 = this.reportData;
          this.reportData2 = this.reportData;
          this.reportData3 = this.reportData;
          if (this.reportData.length != 0) {
            this.requestName = "IT Requests";

            this.ITData = this.reportData[0].incidentStatus;
            this.ITOpenedData = this.ITData[0].opened;
            this.ITClosedData = this.ITData[1].closed;
            this.ITInProgressData = this.ITData[2].inprogress;
            this.ITCount.push(
              this.ITOpenedData,
              this.ITClosedData,
              this.ITInProgressData
            );
          }
          if (this.reportData1.length != 0) {
            this.categoryReportData = this.reportData1[6].category;
            this.categoryHardware = this.categoryReportData.filter(
              (ele: any) => ele.hardware
            );
            this.categorySoftware = this.categoryReportData.filter(
              (ele: any) => ele.software
            );
            if (this.categoryHardware.length != 0) {
              this.categoryHardwareCount = this.categoryHardware[0].hardware;
            } else {
              this.categoryHardwareCount = 0;
            }
            if (this.categorySoftware.length != 0) {
              this.categorySoftwareCount = this.categorySoftware[0].software;
            } else {
              this.categorySoftwareCount = 0;
            }
            this.assetCategoryWiseCount.push(
              this.categoryHardwareCount,
              this.categorySoftwareCount
            );
          }
          if (this.reportData2.length != 0) {
            this.callTypeReportData = this.reportData2[5].callType;

            this.callTypeRequest = this.callTypeReportData.filter(
              (ele: any) => ele.request
            );
            this.callTypeIncident = this.callTypeReportData.filter(
              (ele: any) => ele.incident
            );
            if (this.callTypeRequest.length != 0) {
              this.callTypeRequestCount = this.callTypeRequest[0].request;
            } else {
              this.callTypeRequestCount = 0;
            }
            if (this.callTypeIncident.length != 0) {
              this.callTypeIncidentCount = this.callTypeIncident[0].incident;
            } else {
              this.callTypeIncidentCount = 0;
            }
            this.assetCallTypeWiseCount.push(
              this.callTypeIncidentCount,
              this.callTypeRequestCount
            );

            // this.callTypeRequest = this.callTypeReportData.filter((ele:any)=>ele.request)[0].request;
            // this.callTypeIncident=this.callTypeReportData.filter((ele:any)=>ele.incident)[0].incident;
            // this.assetCallTypeWiseCount.push(this.callTypeIncident,this.callTypeRequest);
          }
          if (this.reportData3.length != 0) {
            this.callModeReportData = this.reportData3[4].callMode;

            this.callModeWeb = this.callModeReportData.filter(
              (ele: any) => ele.webcount
            );
            this.callModeMobile = this.callModeReportData.filter(
              (ele: any) => ele.mobilecount
            );
            if (this.callModeWeb.length != 0) {
              this.callModeWebCount = this.callModeWeb[0].webcount;
            } else {
              this.callModeWebCount = 0;
            }
            if (this.callModeMobile.length != 0) {
              this.callModeMobileCount = this.callModeMobile[0].mobileappcount;
            } else {
              this.callModeMobileCount = 0;
            }
            this.assetCallModeWiseCount.push(
              this.callModeWebCount,
              this.callModeMobileCount
            );
            // this.callModeWeb = this.callModeReportData.filter((ele:any)=>ele.webcount)[0].webcount;
            // this.callModeMobile = this.callModeReportData.filter((ele1:any)=>ele1.mobileappcount)[0].mobileappcount;
            // this.assetCallModeWiseCount.push(this.callModeWeb,this.callModeMobile);
          }
          this.getBarchartForHouseKeeping();
          this.pieChartAssetCategoryWiseWise();
          this.pieChartCallTypeWise();
          this.pieChartCallModeWise();
        });
    } else if (data == "hk") {
      this.opacityCategory = 0;
      this.opacityCallType = 0;
      this.opacityCallMode = 0;
      this.showForIT = false;
      this.showForHK = true;
      this.showForHR = false;
      this.houseKeepingData = [];
      this.houseKeepingCount = [];
      this.adminService
        .getReportData(data, days, sDate, eDate)
        .subscribe((res: any) => {
          console.log(res);
          this.reportData = res.result;
          if (this.reportData.length != 0) {
            // this.showHousekeeping = true;
            // this.showHR = false;
            this.requestName = "Housekeeping Requests";

            // this.opacityHousekeeping = 1;
            // this.opacityHR = 0;
            this.houseKeepingData = this.reportData[0].houseKeepingStatus;
            this.houseKeepingOpenedData = this.houseKeepingData[0].opened;
            this.houseKeepingClosedData = this.houseKeepingData[1].closed;
            this.houseKeepingInProgressData =
              this.houseKeepingData[2].inprogress;
            this.houseKeepingCount.push(
              this.houseKeepingOpenedData,
              this.houseKeepingClosedData,
              this.houseKeepingInProgressData
            );
          }

          //this.housekeepingChart.data.datasets = this.currentDataset;
          //this.housekeepingChart.update();
          this.getBarchartForHouseKeeping();
        });
    } else if (data == "hr") {
      this.opacityCategory = 0;
      this.opacityCallType = 0;
      this.opacityCallMode = 0;
      this.showForIT = false;
      this.showForHK = false;
      this.showForHR = true;
      this.HRData = [];
      this.HRCount = [];
      this.adminService
        .getReportData(data, days, sDate, eDate)
        .subscribe((res: any) => {
          console.log(res);
          this.reportData = res.result;
          if (this.reportData.length != 0) {
            this.requestName = "HR Requests";
            // this.showHousekeeping = false;
            // this.showHR = true;
            // this.opacityHR = 1;
            // this.opacityHousekeeping = 0;
            this.HRData = this.reportData[0].hrStatus;
            this.HROpenedData = this.HRData[0].opened;
            this.HRClosedData = this.HRData[1].closed;
            this.HRInProgressData = this.HRData[2].inprogress;
            this.HRCount.push(
              this.HROpenedData,
              this.HRClosedData,
              this.HRInProgressData
            );
          }
          //  this.currentDataset = this.dataset2;
          //  this.housekeepingChart.data.datasets = [this.currentDataset];
          //    this.housekeepingChart.update();
          this.getBarchartForHouseKeeping();
        });
    }
  }

  getTicketCountForIT(data: any) {
    //for it
    if (data.value == "") {
      this.showdate5 = true;
    } else {
      this.showdate5 = false;
      this.getReportData(this.type, data, this.sDate, this.eDate);
    }
  }

  getTicketCountForHK(data: any) {
    if (data.value == "") {
      this.showdate6 = true;
    } else {
      this.showdate6 = false;
      this.getReportData(this.type, data, this.sDate, this.eDate);
    }
  }

  getTicketCountForHR(data: any) {
    if (data.value == "") {
      this.showdate7 = true;
    } else {
      this.showdate7 = false;
      this.getReportData(this.type, data, this.sDate, this.eDate);
    }
  }

  getBarchartForHouseKeeping() {
    if (this.type == "it") {
      this.dataset1 = {
        label: "IT Requests",
        data: this.ITCount,
        backgroundColor: [
          "rgb(112, 219, 112)",
          "rgb(255, 77, 77)",
          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        hoverBackgroundColor: [
          "rgb(112, 219, 112)",
          "rgb(255, 77, 77)",
          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        borderColor: [
          "rgb(112, 219, 112)",
          "rgb(255, 77, 77)",
          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        borderWidth: 1,
        borderRadius: 10,
      };
      this.currentDataset = this.dataset1;
      // this.housekeepingChart.data.datasets = [this.currentDataset];
      // this.housekeepingChart.update();
    } else if (this.type == "hk") {
      this.dataset2 = {
        label: "Housekeeping Requests",
        data: this.houseKeepingCount,
        backgroundColor: [
          "rgb(112, 219, 112)",
          "rgb(255, 77, 77)",

          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        hoverBackgroundColor: [
          "rgb(112, 219, 112)",
          "rgb(255, 77, 77)",

          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        borderColor: [
          "rgb(112, 219, 112)",
          "rgb(255, 77, 77)",

          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        borderWidth: 1,
        borderRadius: 10,
      };
      this.currentDataset = this.dataset2;
      // this.housekeepingChart.data.datasets = [this.currentDataset];
      // this.housekeepingChart.update();
    } else if (this.type == "hr") {
      this.dataset3 = {
        label: "HR Requests",
        data: this.HRCount,
        backgroundColor: [
          "rgb(112, 219, 112)",
          "rgb(255, 77, 77)",

          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        hoverBackgroundColor: [
          "rgb(112, 219, 112)",
          "rgb(255, 77, 77)",

          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        borderColor: [
          "rgb(112, 219, 112)",
          "rgb(255, 77, 77)",

          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        borderWidth: 1,
        borderRadius: 10,
      };
      this.currentDataset = this.dataset3;
      // this.housekeepingChart.data.datasets = [this.currentDataset];
      // this.housekeepingChart.update();
    }

    this.getBarChart();
    //var currentDataset = this.dataset1;
  }

  getBarChart() {
    debugger;
    // this line of code is for destroy the previously loaded chart instance and data
    if (this.housekeepingChart) {
      this.housekeepingChart.destroy();
    }
    this.canvas = this.housekeepingChart1.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    this.housekeepingChart = new Chart(this.ctx, {
      type: "bar",
      data: {
        labels: this.housekeepingChartLabel,
        datasets: [this.currentDataset],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event: any, activeEls: any) => {
          debugger;
          var datasetIndex = activeEls[0].datasetIndex;

          let dataIndex = activeEls[0].index;

          let datasetLabel = event.chart.data.datasets[datasetIndex].label;

          let value = event.chart.data.datasets[datasetIndex].data[dataIndex];

          let label = event.chart.data.labels[dataIndex];

          if (datasetLabel == "IT Requests") {
            this.router.navigate([`/it-sm/ITDetails/`, label, this.selected]);
          } else if (datasetLabel == "Housekeeping Requests") {
            this.router.navigate([`/it-sm/HKDetails/`, label, this.selected]);
          } else if (datasetLabel == "HR Requests") {
            this.router.navigate([`/it-sm/HRDetails/`, label, this.selected]);
          }
        },
        plugins: {
          datalabels: {
            display: true,

            anchor: "center",

            align: "center",

            color: "#ffffff",

            borderRadius: 1,

            font: {
              size: 10,
            },
          },
          legend: {
            position: "top",
          },
        },
        animation: {
          easing: "easeOutBack",
          delay: 600,
        },
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {},
        },
      },
    });
  }

  pieChartAssetCategoryWiseWise() {
    //this line of code is for destroy the previously loaded chart instance and data
    if (this.assetCategoryWise) this.assetCategoryWise.destroy();
    this.canvas = this.assetCategoryWise1.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    this.assetCategoryWise = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: ["Hardware", "Software"],
        datasets: [
          {
            data: this.assetCategoryWiseCount,
            backgroundColor: ["rgb(112, 219, 112)", "rgb(255, 77, 77)"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event: any, activeEls: any) => {
          var datasetIndex = activeEls[0].datasetIndex;

          let dataIndex = activeEls[0].index;

          let datasetLabel = event.chart.data.datasets[datasetIndex].label;

          let value = event.chart.data.datasets[datasetIndex].data[dataIndex];

          let label = event.chart.data.labels[dataIndex];
        },
        plugins: {
          datalabels: {
            display: true,
            anchor: "center",
            align: "center",
            // backgroundColor: '#ccc',
            color: "#ffffff",
            borderRadius: 3,
            font: {
              size: 18,
            },
          },
        },
      },
    });
  }
  pieChartCallTypeWise() {
    //this line of code is for destroy the previously loaded chart instance and data
    if (this.assetCallType) this.assetCallType.destroy();
    this.canvas = this.assetCallType1.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    this.assetCallType = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: this.assetCallTypeWiseLabel,
        datasets: [
          {
            data: this.assetCallTypeWiseCount,
            backgroundColor: ["rgb(112, 219, 112)", "rgb(255, 77, 77)"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event: any, activeEls: any) => {
          var datasetIndex = activeEls[0].datasetIndex;

          let dataIndex = activeEls[0].index;

          let datasetLabel = event.chart.data.datasets[datasetIndex].label;

          let value = event.chart.data.datasets[datasetIndex].data[dataIndex];

          let label = event.chart.data.labels[dataIndex];
        },
        plugins: {
          datalabels: {
            display: true,
            anchor: "center",
            align: "center",
            // backgroundColor: '#ccc',
            color: "#ffffff",
            borderRadius: 3,
            font: {
              size: 18,
            },
          },
        },
      },
    });
  }
  pieChartCallModeWise() {
    //this line of code is for destroy the previously loaded chart instance and data
    if (this.assetCallMode) this.assetCallMode.destroy();
    this.canvas = this.assetCallMode1.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    this.assetCallMode = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: this.assetCallModeWiseLabel,
        datasets: [
          {
            data: this.assetCallModeWiseCount,
            backgroundColor: ["rgb(112, 219, 112)", "rgb(255, 77, 77)"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event: any, activeEls: any) => {
          var datasetIndex = activeEls[0].datasetIndex;

          let dataIndex = activeEls[0].index;

          let datasetLabel = event.chart.data.datasets[datasetIndex].label;

          let value = event.chart.data.datasets[datasetIndex].data[dataIndex];

          let label = event.chart.data.labels[dataIndex];
        },
        plugins: {
          datalabels: {
            display: true,
            anchor: "center",
            align: "center",
            // backgroundColor: '#ccc',
            color: "#ffffff",
            borderRadius: 3,
            font: {
              size: 18,
            },
          },
        },
      },
    });
  }
  toggleBackground() {
    this.background = this.background ? "" : "primary";
  }
  getActiveLinkType(data1: any) {
    this.type = data1;
    if (this.type == "it") {
      this.getReportData(this.type, this.selected, this.sDate, this.eDate);
    } else if (this.type == "hk") {
      this.getReportData(this.type, this.selected1, this.sDate, this.eDate);
    } else if (this.type == "hr") {
      this.getReportData(this.type, this.selected2, this.sDate, this.eDate);
    }
  }
  onSubmit() {
    if (this.form5.invalid) {
      return;
    }
    this.sDate = this.form5.value.sDate;
    this.eDate = this.form5.value.eDate;
    this.getReportData(this.type, this.selected, this.sDate, this.eDate);
    this.form5.reset();
  }
}
