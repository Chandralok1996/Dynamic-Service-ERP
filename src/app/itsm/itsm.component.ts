import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService, ToasterService, AppService } from '../_services';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-itsm',
  templateUrl: './itsm.component.html',
  styleUrls: ['./itsm.component.css']
})
export class ItsmComponent {
  links = ['All Tickets', 'My Tickets', 'Assigned Tickets', 'Unassigned Tickets', 'Closed Tickets'];
  activeLink = this.links[0];
  background: any = '';
  dataSource: any;
  currentTime:any
  startDate = new Date(2000, 0, 1);
  endDate = new Date(2023, 0, 1);
  show = false;
  incidentlistdata: any;
  userCreated: any;
  pagination: any;
  searchText: string = '';
  filteredCards: any;
  detailsdata: any;
  incid: any;

  constructor(private adminService: AdminService, private toaster: ToasterService, 
              private service: AppService,private router:Router) {}
  ngOnInit(): void {this.incidentlistData()}
  toggleBackground() { this.background = this.background ? '' : 'primary';}
 
  incidentlistData(){
   this.adminService.incidentList().subscribe((res:any)=>{
      console.log(res);
      this.incidentlistdata=res.result
      var keyarr:any=[]
      this.dataSource = new MatTableDataSource( this.incidentlistdata);
      // this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter() {
    if (this.searchText) {
      this.filteredCards =  this.incidentlistdata.filter((card:any) =>
        card.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredCards = this.incidentlistdata; // Show all cards if search text is empty
    }

    
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  gotoincdetails(inid:any){
    this.incid = inid.split('-')
    this.detailsdata=  this.incid[1],
    
    // console.log(this.incid[1]);
    
    this.router.navigate(['/it-sm/details-tickets'])
  }

}
