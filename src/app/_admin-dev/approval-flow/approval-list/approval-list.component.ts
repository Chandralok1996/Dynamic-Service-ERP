import { Component, ViewChild, ViewChildren } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { AdminService, ToasterService, AppService } from "src/app/_services";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatButton } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Route, Router } from "@angular/router";

@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.css']
})
export class ApprovalListComponent {
  formData: any;
  dataSource: any;
  userCreated: any = localStorage.getItem("user-created");
  pagination: any;
  orgId=901;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  action: any;
  form!: FormGroup;
  copyDisplayColumn: any = ["sr","Approval_name","Requester","Action"];
  approvalListData: any;
  approvalId: any;
  apprId: any;

  constructor(
    private adminService: AdminService,
    private toaster: ToasterService,
    private service: AppService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.userCreated = JSON.parse(this.userCreated);
    this.pagination = this.service.pagination;
  }
  public hello: any;
  isMenuOpened: boolean = false;
  @ViewChild('modalClose') modalClose: any;

  ngOnInit(): void {
    this.approvalList();

    this.form = this.formBuilder.group({
      comment: ['', Validators.required]
    });

    var login = localStorage.getItem('user')

    if (login == null) {
      this.service.logout()
    }
  }

  approvalList() {
    
    var a = this.adminService.getapprovalsList().subscribe(
      (res: any) => {
        if(res.status == 200)
        {
          console.log(res);
          this.approvalListData = res.result;
          console.log(a);
  
          var keyarr: any = [];
         
          this.dataSource = new MatTableDataSource(this.approvalListData);
          this.dataSource.paginator = this.paginator;
        }
        else if(res.status == 400){
          this.service.logout();
        }
        else{
          this.toaster.error("Something went wrong,Please contact to your administrator");
        }
      
      })
  }

  approve(data: any){
    this.action = 'Approve';
    this.approvalId = '5001';
    this.apprId = data;

  }

  decline(data: any){
    this.action = 'Decline';
    this.approvalId = '5002';
    this.apprId = data;
  }

  onSubmit(){
    const formData = this.form.value;
    formData.req_id = this.approvalListData[0].req_id;
    formData.level = this.approvalListData[0].level;
    formData.approval_id = this.approvalListData[0].approval_id;
    formData.Approval = this.approvalId;
    console.log(JSON.stringify(formData));
    
    this.adminService.approval(formData).subscribe((res : any) => {
      if(res.status == 200){
        this.toaster.success(res.message);
        setTimeout(() => {
          this.modalClose.nativeElement.click();
        }, 500);
        window.location.reload();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
