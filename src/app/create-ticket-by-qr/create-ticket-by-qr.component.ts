import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { ToasterService, AdminService } from "src/app/_services";
import { AddFieldComponent } from "src/app/master/add-field/add-field.component";
import { environment } from "src/environments/environment.prod";


@Component({
  selector: "app-create-ticket-by-qr",
  templateUrl: "./create-ticket-by-qr.component.html",
  styleUrls: ["./create-ticket-by-qr.component.css"],
})
export class CreateTicketByQRComponent {
  formID: any;
  formFields: any;
  dynamicForm!: FormGroup;
  private formDataSubscription: Subscription = new Subscription();
  incr: any = 0;
  subformdata: any = [];
  nosubform: any = [];
  linkFormData: any = [];
  fmls_id: any;
  disableStatus: boolean = false;
  linkedData: any;
  ShowLinkedData: boolean = false;
  linkedAssetData: any;
  pattern: any;
  moblength: any;
  checking: boolean = true;
  checkMandatory: boolean = false;
  checkValid: boolean = false;
  defaultValue = 1000;
  result: any;
  defaultValue3 = "1007";
  defaultValue1 = 1000;
  defaultValue2 = 1001;
  houseKeepingUserData:any;
  linkData:any=[];
  linkFormCIData:any=[];
  private apiUrl = "qrCode/getFormDetails";
  myFiles: any = [];
  attachment: any = [];
  filesToUpload: Array<File> = [];

  constructor(
    private toaster: ToasterService,
    public dialog: MatDialog,
    private adminService: AdminService,
    private router: Router,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private _http: HttpClient
  ) {
    this.dynamicForm = this.formBuilder.group({
      cicd_id: new FormControl("", [Validators.required]),
      attachment: new FormControl(""),
      ["Support Group"]: new FormControl({
        value: this.defaultValue3,
        disabled: true,
      }),
    //  assignto : new FormControl("",[Validators.required])
    });
  }

  ngOnInit(): void {
    console.log("Hi");
    this.route.paramMap.subscribe((params: any) => {
      this.formID = params.get("id");
    });
    this.getIDBasedLinkingByID(this.formID);
    this.getFormDataById(this.formID);
    this.getLinkedFormList();
   
  }

  getLinkedFormList() {
    this.adminService.getdropdownLinkedList().subscribe((res: any) => {
      console.log(res);
      this.linkFormData = res.rows;
    });
  }
  getFormByIDForQR(fmls_id: number): Observable<any> {
    return this._http.get<any>(`${environment._url}/${this.apiUrl}/${fmls_id}`);
  }
  getFormDataById(id: number): void {
    this.getFormByIDForQR(id).subscribe((res: any) => {
      if (res.status == 200) {
        this.formFields = res.rows;
        this.fmls_id = this.formFields[0].fmls_id;
        this.nosubform = res.rows;
        this.nosubform = this.nosubform.filter((item: any) => {
          return item.type != "subform";
        });
        this.nosubform = this.nosubform.map((res: any) => ({
          ...res,
          isactive: "",
          pattern: "",
        }));
        this.formFields = this.formFields.sort((a: any, b: any) => {
          return a.position - b.position;
        });
        this.nosubform.forEach((value: any) => {
          if (value.mandatory) {
            this.checkMandatory = true;
            if (value.column_label == "Status") {
              this.dynamicForm.addControl(
                `${value.column_label}`,
                this.formBuilder.control(
                  { value: this.defaultValue, disabled: true },
                  Validators.required
                )
              );
            } else if (value.column_label == "Location") {
              this.dynamicForm.addControl(
                `${value.column_label}`,
                this.formBuilder.control(
                  { value: this.defaultValue1, disabled: true },
                  Validators.required
                )
              );
            } else if (value.column_label == "Call Type") {
              this.dynamicForm.addControl(
                `${value.column_label}`,
                this.formBuilder.control(
                  { value: this.defaultValue2, disabled: true },
                  Validators.required
                )
              );
            } else if (value.column_label == "Mobile Number") {
              // this.dynamicForm.controls[`${value.column_label}`].setValidators([Validators.required,Validators.pattern('[0-9]{10}')]);
              this.dynamicForm.addControl(
                `${value.column_label}`,
                this.formBuilder.control(null, [
                  Validators.required,
                  Validators.pattern(
                    "[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
                  ),
                ])
              );
              (value.isactive = 10),
                (value.pattern = `[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`);
              this.pattern = "[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";
            } else {
              this.dynamicForm.addControl(
                `${value.column_label}`,
                this.formBuilder.control(null, Validators.required)
              );
              value.isactive = "";
              value.pattern = "";
            }
          } else {
            this.checkMandatory = false;
            this.dynamicForm.addControl(
              `${value.column_label}`,
              this.formBuilder.control(null)
            );
          }
        });
       
      } else {
        this.toaster.error(res.message);
      }
    });
  }
  OnlyNumbersAllowed(event: any, data: any): boolean {
    console.log(event);
    if (data == "Mobile Number") {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        console.log("charCode restricted is " + charCode);
        this.checking = false;
        return this.checking;
      } else {
        this.checking = true;

        return this.checking;
      }
    } else {
      this.checking = true;
    }
    return this.checking;
  }
  getIDBasedLinkingByID(fmls_id: any) {
    this.adminService
      .getIDBasedLinkingForQRCode(fmls_id)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.linkData = res.rows;
          this.linkFormCIData = this.linkData[0];
         
        } else {
          this.toaster.error("Something went wrong");
        }
      });
  }

 
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  listOfFiles: any[] = [];

  onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.listOfFiles.push(selectedFile.name);
      this.attachment.push(selectedFile);
    }
    console.log(this.attachment);
    // this.attachment.nativeElement.value = '';
  }

  removeSelectedFile(index: any) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    this.attachment.splice(index, 1);
  }
  checkOption(id: any) {}
  submitForm() {
    if (this.dynamicForm.invalid) {
      return;
    }

    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < this.attachment.length; i++) {
      formData.append("attachment", this.attachment[i]);
    }
    formData.append("cicd_id", this.dynamicForm.value.cicd_id);
    formData.append("Guest Name", this.dynamicForm.value["Guest Name"]);
    formData.append("Mobile Number", this.dynamicForm.value["Mobile Number"]);
    formData.append(
      "Issue Description",
      this.dynamicForm.value["Issue Description"]
    );
    // formData.append("actionid",this.accountService.user.response.userId);
    formData.append("Status", 1000);
    formData.append("Location", 1000);
    formData.append("Call Type", 1001);
    formData.append("Support Group", "1007");
    // formData.append("assignto",this.dynamicForm.value.assignto);

    this.adminService.createIncidentByQRCode(formData).subscribe((res: any) => {
      if (res.status == 201) {
        this.router.navigate(["/alert-success"]);
      } else {
        this.toaster.error("Something went wrong");
      }
    });
  }

  ngOnDestroy(): void {
  //  this.formDataSubscription.unsubscribe();
  }
}
