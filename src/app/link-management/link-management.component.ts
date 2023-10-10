import { Component, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdminService, ToasterService, AppService } from 'src/app/_services';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FormGroup ,FormControl} from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-link-management',
  templateUrl: './link-management.component.html',
  styleUrls: ['./link-management.component.css']
})
export class LinkManagementComponent {
  formData: any;
  dataSource: any;
  userCreated: any = localStorage.getItem('user-created');
  pagination: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: any = [];
  private formListSubscription: Subscription = new Subscription();
  tempvar:any;
  copyDisplayColumn: any;
  temparray:any=[]
  formlabel: any
  formfield:any=[]
  getkeys: any;
  x: any=[];
  orgkeys: any;
  fmlsid: any;
  linkListData: any;
  id: any;

  constructor(private adminService: AdminService, 
    private route: ActivatedRoute,
    private toaster: ToasterService, 
    private service: AppService,
    private router:Router
    ) {
    this.userCreated = JSON.parse(this.userCreated);
    this.pagination = this.service.pagination;
    this.id =  this.route.snapshot.params; 
    console.log(this.id);
    
  }
  public hello: any;
  isMenuOpened: boolean = false;

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    // console.log('ID:', id);
    // var paramData =  this.route.snapshot.params['id'];
    // var paramData = this.route.snapshot.params;
    // this.fmlsid=paramData;
    // console.log(this.fmlsid);
    
   this.getLinkList()
  }


  getLinkList()
  {
    debugger
    console.log(this.fmlsid);
    
   var a= this.adminService.linkList(this.fmlsid).subscribe((res:any)=>{
      console.log(res.status);
      this.linkListData=res.result;
      console.log(a);
      var keyarr:any=[]
      this.dataSource = new MatTableDataSource(this.linkListData);
      this.dataSource.paginator = this.paginator;
    },
    (error:any)=>{
      console.log(error.error.message);
      if(error.error.message=="Token is not provided")
      {this.service.logout()}
    }
    )
  }
  selectlabel(event:any,data:any)
  {
    console.log(this.orgkeys);
    var getorg:any=[]
    for(var i=0;i<this.orgkeys.length;i++)
    {
      getorg.push(this.orgkeys[i].keyName)
    }
    console.log(getorg);
    if(event.checked==true){

      let getindex=getorg.indexOf(data.keyName)
      this.x.splice(getindex, 0, data.keyName);
      this.displayedColumns=this.x
      let actionind=this.displayedColumns.indexOf('Action')
      this.displayedColumns.splice(actionind,1)
      this.displayedColumns.push('Action');
    }
    else
    {
      //unchecked
        let getindex=this.x.indexOf(data.keyName)
        this.x.splice(getindex,1)
        this.displayedColumns=this.x
    }
  
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
}
