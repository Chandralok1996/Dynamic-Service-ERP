import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/_services/admin.service';
import { AppService } from 'src/app/_services/app.service';
import { ToasterService } from 'src/app/_services/toaster.service';

@Component({
  selector: 'app-mail-action',
  templateUrl: './mail-action.component.html',
  styleUrls: ['./mail-action.component.css']
})
export class MailActionComponent implements OnInit {
  openApprove: boolean = true;
  openReject: boolean = true;
  form: any;
  mailContent!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];
  orgId = 901;
  approvalListData: any;
  apprID: any;
  paramData: any;
  approvalListDetailsData: any;
  private subscription: Subscription = new Subscription();
  approverListDetailsData: any;
  levelStates: boolean[] = [];
  levelApprove: boolean[] = [];
  levelReject: boolean[] = [];
  varEmail: string = '${{requster}}';
  lble_id: any;
  apprv_id: any;
  responseDetails: any = [];
  update: boolean = false;

  constructor(
    private adminService: AdminService,
    private toaster: ToasterService,
    private service: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paramData = this.route.snapshot.params;
    this.apprID = this.paramData.id;
  }

  ngOnInit(): void {
    this.mailContent = new Editor();

    this.form = new FormGroup({
      mailby: new FormControl('support@orbitindia.net', [Validators.required]),
      mailto: new FormControl('${{requester}}', [Validators.required]),
      cc: new FormControl('', [Validators.email]),
      subject: new FormControl('Approval Request', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });

    this.getApproverListDetails(this.apprID);
  }

  ngAfterViewInit() {
    // Find and store the backdrop element here
  }

  getApproverListDetails(id: any) {
    this.subscription = this.adminService.getApprovaldetails(id).subscribe((res: any) => {
      if (res.status == 200) {
        this.approvalListDetailsData = res.result[0];
        this.approverListDetailsData = this.approvalListDetailsData.approver;
        console.log(JSON.stringify(this.approverListDetailsData));
        for (let i = 0; i < this.approverListDetailsData.length; i++) {
          this.levelStates.push(true);
          this.levelApprove.push(true);
          this.levelReject.push(true);
        }
      }
    });
  }

  get formCtrl() {
    return this.form.controls;
  }

  toggleLevel(index: number) {
    this.levelStates[index] = !this.levelStates[index];
  }

  toggleApprove(index: number){
    this.levelApprove[index] = !this.levelApprove[index]; 
  }

  toggleReject(index: number){
    this.levelReject[index] = !this.levelReject[index]; 
  }

  openEdit(data: any, lble_id: number) {
    this.form.reset();
    this.lble_id = lble_id;
    this.apprv_id = data.apprv_id;
    this.adminService.getApprovalMailTempDetails(data.apprv_id, lble_id).subscribe((res: any)=>{
      this.responseDetails = res.result[0];
      if(this.responseDetails){
        this.update = true;
        this.form.patchValue({
          mailby: this.responseDetails.mailby,
          mailto: this.responseDetails.mailto,
          cc: this.responseDetails.cc,
          subject: this.responseDetails.subject,
          body: this.responseDetails.body
        })
      }else{
        this.update = false;
        this.form.patchValue({
          mailby: 'support@orbitindia.net',
          mailto: '${{requester}}',
          subject: 'Approval Request'
        })
      }
    });
  }

  addResponse() {
    
    var formData = this.form.value;
    if(formData.body == '<p></p>' || formData.body == null){
      this.toaster.info('Please fill body response message!')
      return;
    }
    if(!this.update){
      formData.lble_id = this.lble_id;
      formData.apprv_id = this.apprv_id;
      console.log(JSON.stringify(formData));
      this.adminService.addTemplate(formData).subscribe((res: any) => {
        if (res.status == 200) {
          this.toaster.success(res.message);
        } else {
          this.toaster.error("Something went wrong");
        }
      },
      (error: any) => {
        console.log(JSON.stringify(error));
        console.log(error.err);
        if (error && error.err && error.err.length > 0) {
          error.err.forEach((errorMessage: any) => {
            this.toaster.error(errorMessage);
          });
        }
        // this.toaster.error(error.err[0]);
      })
    }else{
      formData.mail_id = this.responseDetails.mail_id;
      formData.apprv_id = this.responseDetails.apprv_id;
      formData.lble_id = this.responseDetails.lble_id;
      this.adminService.updateTemplate(formData).subscribe((res: any) => {
        if (res.status == 200) {
          this.toaster.success(res.message);
        } else {
          this.toaster.error("Something went wrong");
        }
      },
      (error: any) => {
        console.log(JSON.stringify(error));
        console.log(error.err);
        if (error && error.err && error.err.length > 0) {
          error.err.forEach((errorMessage: any) => {
            this.toaster.error(errorMessage);
          });
        }
      })
    }
  }

  cancelForm() {
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
