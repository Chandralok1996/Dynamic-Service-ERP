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
  approverListDetailsData: any = [];
  lble_id: any;
  apprv_id: any;
  responseDetails: any = [];
  update: boolean = false;
  filteredData: { [key: string]: string[] } = {};
  varEmail: string = "${{receiver}}";
  selectedLabels: string[] = [];
  formDataLabels: any[] = [];
  formListData: any = [];

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
      subject: new FormControl('Approval Request', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });

    this.getApproverListDetails(this.apprID);
  }

  onLabelSelectionChange() {
    ;
    this.form.get('body').setValue(this.generateBodyContent());
  }

  generateBodyContent(): string {
    ;
    let bodyContent = '';
    console.log(this.selectedLabels);
    this.selectedLabels.forEach(label => {
      bodyContent += `<p>${label}: {{${label}}}</p>`;
    });

    return bodyContent;
  }

  getApproverListDetails(id: any) {
    this.subscription = this.adminService.getApprovaldetails(id).subscribe((res: any) => {
      if (res.status == 200) {
        this.approvalListDetailsData = res.result[0];
        console.log(JSON.stringify(this.approvalListDetailsData));
        this.approverListDetailsData = this.approvalListDetailsData.approver;
        console.log(JSON.stringify(this.approverListDetailsData));
        this.approverListDetailsData.forEach((item: any) => {
          const levelName = item.level_name;
      if (!this.filteredData[levelName]) {
        this.filteredData[levelName] = [];
      }
      this.filteredData[levelName].push(item.name);
        });
      }
    });
  }

  getFilteredDataKeys() {
    return Object.keys(this.filteredData);
  }

  get formCtrl() {
    return this.form.controls;
  }

  openEdit(lble_id: number) {
    this.form.reset();
    this.lble_id = lble_id;
    this.adminService.getApprovalMailTempDetails(this.apprID, lble_id).subscribe((res: any)=>{
      this.responseDetails = res.result[0];
      if(this.responseDetails){
        this.update = true;
        this.form.patchValue({
          subject: this.responseDetails.subject,
          body: this.responseDetails.body
        })
      }else{
        this.update = false;
        this.form.patchValue({
          subject: 'Approval Request'
        })
      }
    });
    
    this.adminService.getFormByID(this.approvalListDetailsData.fmls_id).subscribe((res: any)=> {
      this.formDataLabels = res.rows;
    })

  }

  addResponse() {
    
    var formData = this.form.value;
    if(formData.body == '<p></p>' || formData.body == null){
      this.toaster.info('Please fill body response message!')
      return;
    }
    if(!this.update){
      formData.lble_id = this.lble_id;
      formData.appr_id = this.apprID;
      if(this.lble_id == '5005'){
        formData.body = formData.body + `<a href="http://172.16.15.22:6715/admin/approvals">Click here to approve</a>`
      }
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
      })
    }else{
      formData.appr_id = this.apprID;
      formData.mail_id = this.responseDetails.mail_id;
      formData.lble_id = this.responseDetails.lble_id;
      if(this.lble_id == '5005'){
        formData.body = formData.body + `<a href="http://172.16.15.22:6715/admin/approvals">Click here to approve</a>`
      }
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
