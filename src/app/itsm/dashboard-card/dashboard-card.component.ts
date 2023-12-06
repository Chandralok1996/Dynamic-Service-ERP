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
  // @ViewChild('requestSupportModelChart1', { static: true }) requestSupportModelChart1: any;
  // @ViewChild('assetAssignedUnassigned1', { static: true }) assetAssignedUnassigned1: any;
  // @ViewChild('top5hardwareIncident1', { static: true }) top5hardwareIncident1: any;
  // @ViewChild('orbitSLAChart1', { static: true }) orbitSLAChart1: any;
  // @ViewChild('modeOfLocationChart1', { static: true }) modeOfLocationChart1: any;
  links = [
    { type: "IT", value: "it" },
    { type: "Housekeeping", value: "hk" },
    { type: "HR", value: "hr" },
  ];
  activeLink = "it";
  background: any = "";
  hkBarChart:boolean=false;
  //for ngx charts
  name = "Angular";
  single: any = [];
  multi: any = [];
  opacityHousekeeping = 0;
  opacityHR = 0;
  pensingStatus: any = [
    { status: "Assigned", count: 2 },
    { status: "New", count: 2 },
    { status: "Resolved", count: 3 },
  ];
  view: any = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Country";
  showYAxisLabel = true;
  yAxisLabel = "Population";

  colorScheme: any = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };

  allUser: any = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selection = new SelectionModel<any>(true, []);
  tabledata: any;
  value: any;
  length = 32;
  pageSize = 8;
  pageSizeOptions: number[] = [8, 16, 24, 32];

  callStatus: any = [];
  modeofLoc = "Quarter 1";
  form: any;
  form1: any;
  form2: any;
  form3: any;
  form4!: FormGroup;
  form5!: FormGroup;
  form6: any;
  formLoc: any;
  loading = false;
  submitted = false;

  currentDate = new Date();
  currentMonthString = Math.floor(this.currentDate.getMonth() / 3) + 1;
  currentYearString = this.currentDate.getFullYear();
  callType: any;
  event: any;
  //pensingStatus: any;
  resStatus: any;

  sDate = "";
  eDate = "";
  error: any;
  isShow: boolean = false;
  count: any;
  showdate: boolean = false;
  showdate2: boolean = false;
  showdate3: boolean = false;
  showdate4: boolean = false;
  showdate5: boolean = false;
  showdate6: boolean = false;
  showdateLoc: any;
  desktopname: any;
  days: any = 1;
  callmdays: any = 1;
  countlen: any;
  assetname: any;
  assetcount: any;
  newarr: any;
  newarr1: any;
  totalmail: any;
  totoalweb: any;
  totalphone: any;
  totalresmail: any;
  reqmail: any;
  reqremote: any;
  reqdevice: any;
  reqloc: any;
  reqtele: any;
  initialval: any;
  initvalsla: any;
  res: any;
  moderes: any;
  calltyperes: any;
  reqmoderes: any;
  hardwareres: any;
  myProjectStatusChart: any;
  canvas: any;
  ctx: any;
  showForIT:boolean=false;
  showAssetLocTable: boolean = false;
  assetGroup: any = [];
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
  dataset3:any=[];
  ITCount:any=[];
  ITOpenedData:any=[];
  ITClosedData:any=[];
  ITInProgressData:any=[];
  currentDataset: any;
  requestName="";
  type: any = "it";
  selected = "7";
  selected1 = "7";
  selected2 = "7";
  showdate7:boolean=false;
  ITData:any;
  showForHK:boolean=false;
  showForHR:boolean=false;
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
    this.form4 = this.formBuilder.group({
      sDate: ["", Validators.required],
      eDate: ["", Validators.required],
    });
    this.getReportData(this.type, this.selected, this.sDate, this.eDate);
  }

  getunassignedTicket() {}
  statucount() {}
  getAssignedUnassignedAssetData() {}
  getBarWithAssetGroup() {}

  getReportData(data: any, days: any, sDate: any, eDate: any) {
    ;
    this.reportData = [];
    this.requestName="";
    if (data == "it") {
      this.showForIT=true;
      this.showForHK=false;
      this.showForHR=false;
      this.ITData = [];
      this.ITCount = [];
      this.adminService
        .getReportData(data, days, sDate, eDate)
        .subscribe((res: any) => {
          console.log(res);
          this.reportData = res.result;
          if (this.reportData.length != 0) {
           
            this.requestName = "IT Requests";
           
           
            this.ITData = this.reportData[0].incidentStatus;
            this.ITOpenedData = this.ITData[0].opened;
            this.ITClosedData = this.ITData[1].closed;
            this.ITInProgressData =
              this.ITData[2].inprogress;
            this.ITCount.push(
              this.ITOpenedData,
              this.ITClosedData,
              this.ITInProgressData
            );
          }
          this.getBarchartForHouseKeeping();
        });
    } else if (data == "hk") {
      this.showForIT=false;
      this.showForHK=true;
      this.showForHR=false;
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
      this.showForIT=false;
      this.showForHK=false;
      this.showForHR=true;
      this.HRData = [];
      this.HRCount = [];
      this.adminService
        .getReportData(data, days, sDate, eDate)
        .subscribe((res: any) => {
          console.log(res);
          this.reportData = res.result;
          if (this.reportData.length != 0) {
            this.requestName = "HR Requests"
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

  getTicketCountForHK(data:any){
    if (data.value == "") {
      this.showdate6 = true; 
    } else {
      this.showdate6 = false;
      this.getReportData(this.type, data, this.sDate, this.eDate);
    }
  }

  getTicketCountForHR(data:any){
    if (data.value == "") {
      this.showdate7 = true; 
    } else {
      this.showdate7 = false;
      this.getReportData(this.type, data, this.sDate, this.eDate);
    }
  }
  chartAssetLocationwise() {
    //  this line of code is for destroy the previously loaded chart instance and data
    // if (this.myProjectStatusChart) this.myProjectStatusChart.destroy();
    // this.canvas = this.mychart.nativeElement;
    // this.ctx = this.canvas.getContext("2d");
    // this.myProjectStatusChart = new Chart(this.ctx, {
    //   type: "bar",
    //   data: {
    //     labels: this.assetLocLabel,
    //     datasets: [
    //       {
    //         label: "Assets location",
    //         data: this.assetLocCount,
    //         backgroundColor: [
    //           "rgb(0, 180, 216)",
    //           "rgb(0, 119, 182)",
    //           "rgb(202, 240, 248)",
    //           "rgb(144, 224, 239)",
    //           "rgb(3, 4, 94)",
    //         ],
    //         hoverBackgroundColor: [
    //           "rgb(0, 180, 216)",
    //           "rgb(0, 119, 182)",
    //           "rgb(202, 240, 248)",
    //           "rgb(144, 224, 239)",
    //           "rgb(3, 4, 94)",
    //         ],
    //         borderColor: [
    //           "rgb(0, 180, 216)",
    //           "rgb(0, 119, 182)",
    //           "rgb(202, 240, 248)",
    //           "rgb(144, 224, 239)",
    //           "rgb(3, 4, 94)",
    //         ],
    //         borderWidth: 1,
    //         borderRadius: 10,
    //       },
    //     ],
    //   },
    //   options: {
    //     onClick: (event: any, activeEls: any) => {
    //       var datasetIndex = activeEls[0].datasetIndex;
    //       let dataIndex = activeEls[0].index;
    //       let datasetLabel = event.chart.data.datasets[datasetIndex].label;
    //       let value = event.chart.data.datasets[datasetIndex].data[dataIndex];
    //       let label = event.chart.data.labels[dataIndex];
    //       var x = {
    //         title: label,
    //       };
    //       var y = JSON.stringify(x);
    //       this.router.navigate([`/it-sm/assetLocation_Details/`, x]);
    //     },
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     plugins: {
    //       datalabels: {
    //         display: true,
    //         anchor: "center",
    //         align: "center",
    //         color: "#ffffff",
    //         borderRadius: 3,
    //         font: {
    //           size: 18,
    //         },
    //       },
    //       legend: {
    //         position: "top",
    //       },
    //     },
    //     animation: {
    //       easing: "easeOutBack",
    //       delay: 600,
    //     },
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });
  }
  pieChartAssetAssignedUnassignedWise() {
    //this line of code is for destroy the previously loaded chart instance and data
    // if (this.assignedUnassignedChart) this.assignedUnassignedChart.destroy();
    // this.canvas = this.assetAssignedUnassigned1.nativeElement;
    // this.ctx = this.canvas.getContext('2d');
    // this.assignedUnassignedChart = new Chart(this.ctx, {
    //   type: 'pie',
    //   data: {
    //     labels: this.assetAssignedUnassignedLabel,
    //     datasets: [{
    //       data: this.assetAssignedUnassignedCount,
    //       backgroundColor: [
    //         'rgb(0, 180, 216)',
    //         'rgb(0, 119, 182)'
    //       ],
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     onClick: (event: any, activeEls: any) => {
    //       var datasetIndex = activeEls[0].datasetIndex;
    //       let dataIndex = activeEls[0].index;
    //       let datasetLabel = event.chart.data.datasets[datasetIndex].label;
    //       let value = event.chart.data.datasets[datasetIndex].data[dataIndex];
    //       let label = event.chart.data.labels[dataIndex];
    //       var x = {
    //         "title": label,
    //       }
    //       var y = JSON.stringify(x)
    //       this.router.navigate([`/it-sm/assignedUnassignedDetails/`, x]);
    //     },
    //     plugins: {
    //       datalabels: {
    //         display: true,
    //         anchor: 'center',
    //         align: 'center',
    //         // backgroundColor: '#ccc',
    //         color: '#ffffff',
    //         borderRadius: 3,
    //         font: {
    //           size: 18,
    //         },
    //       },
    //     }
    //   },
    // });
  }

  getBarchartForHouseKeeping() {
    
    if(this.type=='it'){
    
        this.dataset1 = {
          label: "IT Requests",
          data: this.ITCount,
          backgroundColor: [
            "rgb(102, 255, 51)",
            "rgb(255, 51, 51)",
            "rgb(128, 191, 255)",
            "rgb(255, 77, 196)",
            "rgb(255, 166, 77)",
          ],
          hoverBackgroundColor: [
            "rgb(202, 240, 248)",
            "rgb(255, 51, 51)",
            "rgb(128, 191, 255)",
            "rgb(255, 77, 196)",
            "rgb(255, 166, 77)",
          ],
          borderColor: [
            "rgb(202, 240, 248)",
            "rgb(255, 51, 51)",
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
      
    }
    else if(this.type == 'hk'){
      this.dataset2 = {
        label: "Housekeeping Requests",
        data: this.houseKeepingCount,
        backgroundColor: [
          "rgb(102, 255, 51)",
          "rgb(255, 51, 51)",
          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        hoverBackgroundColor: [
          "rgb(202, 240, 248)",
          "rgb(255, 51, 51)",
          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        borderColor: [
          "rgb(202, 240, 248)",
          "rgb(255, 51, 51)",
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
    }
    else if(this.type == 'hr'){
      this.dataset3 = {
        label: "HR Requests",
        data: this.HRCount,
        backgroundColor: [
          "rgb(102, 255, 51)",
          "rgb(255, 51, 51)",
          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        hoverBackgroundColor: [
          "rgb(202, 240, 248)",
          "rgb(255, 51, 51)",
          "rgb(128, 191, 255)",
          "rgb(255, 77, 196)",
          "rgb(255, 166, 77)",
        ],
        borderColor: [
          "rgb(202, 240, 248)",
          "rgb(255, 51, 51)",
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

  getBarChart(){
    debugger
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
          datasets: [this.currentDataset]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          onClick: (event: any, activeEls: any) => {
            debugger
            var datasetIndex = activeEls[0].datasetIndex;
  
            let dataIndex = activeEls[0].index;
  
            let datasetLabel = event.chart.data.datasets[datasetIndex].label;
  
            let value = event.chart.data.datasets[datasetIndex].data[dataIndex];
  
            let label = event.chart.data.labels[dataIndex];

           if(datasetLabel == 'IT Requests')
           {
            this.router.navigate([`/it-sm/ITDetails/`,label,this.selected]);
           }
           else if(datasetLabel == 'Housekeeping Requests'){
            this.router.navigate([`/it-sm/HKDetails/`,label,this.selected]);
           }
           else if(datasetLabel == 'HR Requests'){
            this.router.navigate([`/it-sm/HRDetails/`,label,this.selected]);

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

 

  toggleBackground() {
    this.background = this.background ? "" : "primary";
  }
  getActiveLinkType(data1: any) {
    
    this.type = data1;
    if(this.type=='it')
    {
    this.getReportData(this.type, this.selected, this.sDate, this.eDate);

    }
    else if(this.type=='hk')
    {
    this.getReportData(this.type, this.selected1, this.sDate, this.eDate);

    }
    else if(this.type=='hr')
    {
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
  }
 
}
