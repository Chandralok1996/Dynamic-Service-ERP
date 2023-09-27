import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import {
  Chart, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, registerables
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent {
  @ViewChild('assetTypeChart1', { static: true }) assetTypeChart1: any;
  @ViewChild('mychart', { static: true }) mychart: any;
  @ViewChild('callTypeChart1', { static: true }) callTypeChart1: any;
  @ViewChild('requestSupportModelChart1', { static: true }) requestSupportModelChart1: any;
  @ViewChild('assetAssignedUnassigned1', { static: true }) assetAssignedUnassigned1: any;
  @ViewChild('top5hardwareIncident1', { static: true }) top5hardwareIncident1: any;
  @ViewChild('orbitSLAChart1', { static: true }) orbitSLAChart1: any;
  @ViewChild('modeOfLocationChart1', { static: true }) modeOfLocationChart1: any;

  //for ngx charts
  name = 'Angular';
  single: any = [];
  multi: any = [];
  pensingStatus: any = [{ status: 'Assigned', count: 2 }, { status: 'New', count: 2 }, { status: 'Resolved', count: 3 }];
  view: any = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  allUser: any = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['engineer', 'count'];

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
  form4: any;
  form5: any;
  form6: any;
  formLoc: any;
  loading = false;
  submitted = false;

  currentDate = new Date();
  currentMonthString = Math.floor(this.currentDate.getMonth() / 3) + 1;
  currentYearString = this.currentDate.getFullYear();
  callType: any;
  //pensingStatus: any;
  resStatus: any;
  hardwareinci: any;
  desktopinc: any;
  laptopinc: any;
  networkinc: any;
  serverinc: any;
  printerinc: any;
  desktopinccount: any;
  desktopinc1: any;
  laptopinc1: any;
  laptopinccount: any;
  networkinc1: any;
  networkinccount: any;
  serverinc1: any;
  serverinccount: any;
  printerinc1: any;
  printerinccount: any;
  sla: any;
  slaout: any;
  slawith: any;
  totalsla: any;
  quater: any;
  sDate: any;
  eDate: any;
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
  assetLocData: any;
  assetLoc1Data: any;
  assetLoc2Data: any;
  assetLocLabel: any = ['ISpace Third', 'Shivaneri First'];
  assetLocCount: any = [8, 2];
  assetLocTableList: any;
  showAssetLocTable: boolean = false;
  assetGroup: any = [];
  assetTypeChart: any;
  callTypeChart: any;
  requestSupportModelChart: any;
  modeOfLocationChart: any;
  assetLocationChart: any;
  assignedUnassignedChart: any;
  topFiveHardwareIncidentChart: any;
  orbitSLALabel: any = ['Within SLA', 'Out of SLA'];
  orbitSLACount: any = [2, 1];
  orbitSLAChart: any;
  assetTypeLabel: any = ['DESKTOP', 'LAPTOP', 'MONITOR', 'ACCESSORIES', 'SERVER'];
  assetTypeCount: any = [2, 3, 1, 1, 1];
  assetAssignedUnassignedData: any;
  assetAssignedUnassignedCount: any = [7, 2];
  topFiveHardwareIncidentLabel: any = ['LAPTOP', 'ACCESSORIES', 'DESKTOP', 'MONITOR', 'SERVER'];
  topFiveHardwareIncidentCount: any = [5, 2, 5, 2, 14];
  assetAssignedUnassigned: any;
  assetAssignedUnassignedLabel: any = ['Assigned Assets', 'Unassigned Assets'];
  orbitWithinSLACount: any;
  orbitOutofSLACount: any;
  orbitLabel1: any;
  orbitLabel2: any;
  modeOfLocationCallLabel: any = ['Mail', 'Web'];
  modeOfLocationCallCount: any = [3, 2];
  callTypeLabel: any = ['INCIDENT', 'REQUEST'];
  callTypeCount: any = [3, 2];
  requestSupportLabel: any = ['E-mail', 'Remote Session of Requestors Device'];
  requestSupportCount: any = [3, 1];


  constructor(private router: Router, private formBuilder: FormBuilder) {
    Chart.register(...registerables, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);
  }

  ngOnInit(): void {
    this.barChartModeofLocationCallwise();
    this.getunassignedTicket();
    this.bar();
    this.bar1();
    // this.bar2();
    this.bar3();
    this.engineerData();
    this.orbitSLA();
    this.assetLocation();
    this.getBarWithAssetGroup();
    this.getBarchartAssetTypewise();
    this.getAssignedUnassignedAssetData();
    this.pieChartTopFiveHardwareIncidentWise();
    this.chartAssetLocationwise();
    this.pieChartAssetAssignedUnassignedWise();
    this.statucount();
    // this.hardware(this.currentMonthString);
    if (this.currentMonthString == 1) {
      setTimeout(() => {
        this.form.patchValue({
          quater: 'Quarter 1'
        })
        console.log(this.form.value.quarter);
      }, 1000);

    } else if (this.currentMonthString == 2) {
      setTimeout(() => {
        this.form.patchValue({
          quater: 'Quarter 2'
        })
        console.log(this.form.value.quarter);
      }, 1000);

    } else if (this.currentMonthString == 3) {
      setTimeout(() => {
        this.form.patchValue({
          quater: 'Quarter 3'
        })
        console.log(this.form.value.quarter);
      }, 1000);

    } else if (this.currentMonthString == 4) {
      setTimeout(() => {
        this.form.patchValue({
          quater: 'Quarter 4'
        })
        console.log(this.form.value.quarter);
      }, 1000);
    }
  }

  getunassignedTicket() { }
  statucount() { }
  getAssignedUnassignedAssetData() { }
  getBarWithAssetGroup() { }
  barChartModeofLocationCallwise() {

  };
  assetLocation() { }
  orbitSLA() {
    //this line of code is for destroy the previously loaded chart instance and data
    if (this.orbitSLAChart) this.orbitSLAChart.destroy();
    this.canvas = this.orbitSLAChart1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.orbitSLAChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: this.orbitSLALabel,
        datasets: [{
          data: this.orbitSLACount,
          backgroundColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)'

          ],
        }]
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

          var x = {
            "title": label,
          }
          var y = JSON.stringify(x)
          this.router.navigate(['/it-sm/sla-details', x]);
        },
        plugins: {
          datalabels: {
            display: true,
            anchor: 'center',
            align: 'center',
            color: '#ffffff',
            borderRadius: 3,
            font: {
              size: 18,
            },
          },
        }
      },
    });
  }
  engineerData() { }
  bar3() {
    // const data = event.target ? (event.target as HTMLInputElement).value : event;
    // this.initvalsla = data;
    // (this.initvalsla == 'Current day') ? this.callmdays = '' :
    //   (this.initvalsla == 'Last 7 days') ? this.callmdays = 7 :
    //     (this.initvalsla == 'Last 30 days') ? this.callmdays = 30 : null;
    // (this.initvalsla == 'Select date') ? this.showdate5 = true : this.showdate5 = false; this.form5.reset();
    // const params = new HttpParams().set('days', this.callmdays)
    //this line of code is for destroy the previously loaded chart instance and data
    if (this.requestSupportModelChart) this.requestSupportModelChart.destroy();
    this.canvas = this.requestSupportModelChart1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.requestSupportModelChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.requestSupportLabel,
        datasets: [{
          label: 'Request Support Model',
          data: this.requestSupportCount,
          backgroundColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
          hoverBackgroundColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
          borderColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
          borderWidth: 1,
          borderRadius: 10,
        }]
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
          var x = {
            "responseMode": label,
          }
          var y = JSON.stringify(x)

          this.router.navigate([`/it-sm/call-response/`, x]);
        },
        plugins: {
          datalabels: {
            display: true,

            anchor: 'center',

            align: 'center',

            // backgroundColor: '#ccc',

            color: '#ffffff',

            borderRadius: 3,

            font: {

              size: 18,

            },
          },
          legend: {
            position: 'top',
          },
        },
        animation: {
          easing: 'easeOutBack',
          delay: 600,
        },
        scales: {
          y: {
            beginAtZero: true
          },
        },
      }
    });
  }
  bar1() {
    // const data = event.target ? (event.target as HTMLInputElement).value : event;
    // this.initvalsla = data;
    // (this.initvalsla == 'Current day') ? this.callmdays = '' :
    //   (this.initvalsla == 'Last 7 days') ? this.callmdays = 7 :
    //     (this.initvalsla == 'Last 30 days') ? this.callmdays = 30 : null;
    // (this.initvalsla == 'Select date') ? this.showdate5 = true : this.showdate5 = false; this.form5.reset();
    // const params = new HttpParams().set('days', this.callmdays)
    //this line of code is for destroy the previously loaded chart instance and data
    if (this.callTypeChart) this.callTypeChart.destroy();
    this.canvas = this.callTypeChart1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.callTypeChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.callTypeLabel,
        datasets: [{
          label: 'Call Type',
          data: this.callTypeCount,
          backgroundColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
          hoverBackgroundColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
          borderColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
          borderWidth: 1,
          borderRadius: 10,
        }]
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
          var x = {
            "category": label,
          }
          var y = JSON.stringify(x)
          this.router.navigate([`/it-sm/call-type/`, x]);
        },
        plugins: {
          datalabels: {
            display: true,

            anchor: 'center',

            align: 'center',

            // backgroundColor: '#ccc',

            color: '#ffffff',

            borderRadius: 3,

            font: {

              size: 18,

            },
          },
          legend: {
            position: 'top',
          },
        },
        animation: {
          easing: 'easeOutBack',
          delay: 600,
        },
        scales: {
          y: {
            beginAtZero: true
          },
        },
      }
    });
  }
  bar() {
    // const data = event.target ? (event.target as HTMLInputElement).value : event;
    // this.initvalsla = data;
    // (this.initvalsla == 'Current day') ? this.callmdays = '' :
    //   (this.initvalsla == 'Last 7 days') ? this.callmdays = 7 :
    //     (this.initvalsla == 'Last 30 days') ? this.callmdays = 30 : null;
    // (this.initvalsla == 'Select date') ? this.showdate5 = true : this.showdate5 = false; this.form5.reset();
    // const params = new HttpParams().set('days', this.callmdays)
    //this line of code is for destroy the previously loaded chart instance and data
    if (this.modeOfLocationChart) this.modeOfLocationChart.destroy();
    this.canvas = this.modeOfLocationChart1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.modeOfLocationChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.modeOfLocationCallLabel,
        datasets: [{
          label: 'Mode of Location Call',
          data: this.modeOfLocationCallCount,
          backgroundColor: [
            // 'rgb(23, 56, 211)',
            // 'rgb(245, 125, 12)',
            // 'rgb(109, 214, 214)',
            // 'rgb(235, 101, 152)',
            // 'rgb(240, 158, 17)
            // 'rgb(202, 240, 248)',
            // 'rgb(144, 224, 239)',
            // 'rgb(0, 180, 216)',
            // 'rgb(0, 119, 182)',
            // 'rgb(3, 4, 94)',
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
          hoverBackgroundColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
          borderColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
          borderWidth: 1,
          borderRadius: 10,
        }]
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
          var x = {
            "title": label,
          }
          var y = JSON.stringify(x)
          this.router.navigate([`/it-sm/call-mode/`, x]);
        },
        plugins: {
          datalabels: {
            display: true,

            anchor: 'center',

            align: 'center',

            // backgroundColor: '#ccc',

            color: '#ffffff',

            borderRadius: 3,

            font: {

              size: 18,

            },
          },
          legend: {
            position: 'top',
          },
        },
        animation: {
          easing: 'easeOutBack',
          delay: 600,
        },
        scales: {
          y: {
            beginAtZero: true
          },
        },
      }
    });
  }
  pieChartTopFiveHardwareIncidentWise() {
    //this line of code is for destroy the previously loaded chart instance and data
    if (this.topFiveHardwareIncidentChart) this.topFiveHardwareIncidentChart.destroy();
    this.canvas = this.top5hardwareIncident1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.topFiveHardwareIncidentChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: this.topFiveHardwareIncidentLabel,
        datasets: [{
          data: this.topFiveHardwareIncidentCount,
          backgroundColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: true,
            anchor: 'center',
            align: 'center',
            color: '#ffffff',
            borderRadius: 3,
            font: {
              size: 18,
            },
          },
        }
      },
    });

  }
  chartAssetLocationwise() {
    //this line of code is for destroy the previously loaded chart instance and data
    if (this.myProjectStatusChart) this.myProjectStatusChart.destroy();
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.myProjectStatusChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.assetLocLabel,
        datasets: [
          {
            label: 'Assets location',
            data: this.assetLocCount,
            backgroundColor: [
              'rgb(0, 180, 216)',
              'rgb(0, 119, 182)',
              'rgb(202, 240, 248)',
              'rgb(144, 224, 239)',
              'rgb(3, 4, 94)'
            ],
            hoverBackgroundColor: [
              'rgb(0, 180, 216)',
              'rgb(0, 119, 182)',
              'rgb(202, 240, 248)',
              'rgb(144, 224, 239)',
              'rgb(3, 4, 94)'
            ],
            borderColor: [
              'rgb(0, 180, 216)',
              'rgb(0, 119, 182)',
              'rgb(202, 240, 248)',
              'rgb(144, 224, 239)',
              'rgb(3, 4, 94)'
            ],
            borderWidth: 1,
            borderRadius: 10,
          }
        ]
      },
      options: {
        onClick: (event: any, activeEls: any) => {

          var datasetIndex = activeEls[0].datasetIndex;

          let dataIndex = activeEls[0].index;

          let datasetLabel = event.chart.data.datasets[datasetIndex].label;

          let value = event.chart.data.datasets[datasetIndex].data[dataIndex];

          let label = event.chart.data.labels[dataIndex];
          var x = {
            "title": label,
          }
          var y = JSON.stringify(x)
          this.router.navigate([`/it-sm/assetLocation_Details/`, x]);

          // if (label == 'ISpace Third') {
          //   this.showAssetLocTable = true;
          //   this.assetLocTableList = this.assetLoc1Data.details;
          // } else if (label == 'Shivaneri First') {
          //   this.showAssetLocTable = true;
          //   this.assetLocTableList = this.assetLoc2Data.details;
          // }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: true,

            anchor: 'center',

            align: 'center',

            // backgroundColor: '#ccc',

            color: '#ffffff',

            borderRadius: 3,

            font: {

              size: 18,

            },
          },
          legend: {
            position: 'top',
          },
        },
        animation: {
          easing: 'easeOutBack',
          delay: 600,
        },
        scales: {
          y: {
            beginAtZero: true
          },
        },
      }
    });
  }
  pieChartAssetAssignedUnassignedWise() {
    //this line of code is for destroy the previously loaded chart instance and data
    if (this.assignedUnassignedChart) this.assignedUnassignedChart.destroy();
    this.canvas = this.assetAssignedUnassigned1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.assignedUnassignedChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: this.assetAssignedUnassignedLabel,
        datasets: [{
          data: this.assetAssignedUnassignedCount,
          backgroundColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)'
          ],
        }]
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
          var x = {
            "title": label,
          }
          var y = JSON.stringify(x)
          this.router.navigate([`/it-sm/assignedUnassignedDetails/`, x]);
        },
        plugins: {
          datalabels: {
            display: true,
            anchor: 'center',
            align: 'center',
            // backgroundColor: '#ccc',
            color: '#ffffff',
            borderRadius: 3,
            font: {
              size: 18,
            },
          },
        }
      },
    });
  }
  getBarchartAssetTypewise() { //this line of code is for destroy the previously loaded chart instance and data
    if (this.assetTypeChart) this.assetTypeChart.destroy();
    this.canvas = this.assetTypeChart1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.assetTypeChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.assetTypeLabel,
        datasets: [{
          label: 'Asset Types',
          data: this.assetTypeCount,
          backgroundColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
          hoverBackgroundColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
          borderColor: [
            'rgb(0, 180, 216)',
            'rgb(0, 119, 182)',
            'rgb(202, 240, 248)',
            'rgb(144, 224, 239)',
            'rgb(3, 4, 94)'
          ],
          borderWidth: 1,
          borderRadius: 10,
        }]
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
          var x = {
            "title": label,
          }
          var y = JSON.stringify(x)
          this.router.navigate([`/it-sm/assetTypeDetails/`, x]);

        },
        plugins: {
          datalabels: {
            display: true,

            anchor: 'center',

            align: 'center',

            // backgroundColor: '#ccc',

            color: '#ffffff',

            borderRadius: 3,

            font: {

              size: 18,

            },
          },
          legend: {
            position: 'top',
          },
        },
        animation: {
          easing: 'easeOutBack',
          delay: 600,
        },
        scales: {
          y: {
            beginAtZero: true
          },
        },
      }
    });
  }
  statusDetails(data: any) {

    var paramval = {
      status: data
    }
    this.router.navigate(['/it-sm/pending-status', paramval]);
  }
  statucountwithdate() { }
}
