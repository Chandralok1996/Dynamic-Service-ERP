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
import { ToasterService, AdminService, AppService } from "src/app/_services";



@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent {
  formID: any;
  formFields: any;
  form:any;
  myFiles: any = [];
  attachment: any = [];
  rating:boolean=false;
  filesToUpload: Array<File> = [];
  result:any;
  tmp : boolean = false;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: any;

  ratings:any= [
    {name: 'Excellent', completed: false},
    {name: 'Very Good', completed: false},
    {name: 'Good', completed: false},
    {name: 'Fair', completed: false},
    {name: 'Poor', completed: false},
  ];
  likingOptions:any=[{name: 'Very Likely', completed: false},
  {name: 'Likely', completed: false},
  {name: 'Neutral', completed: false},
  {name: 'Unlikely', completed: false},
  {name: 'Very Unlikely', completed: false},];
  constructor(
    private toaster: ToasterService,
    public dialog: MatDialog,
    private adminService: AdminService,
    private router: Router,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private _http: HttpClient
  ) {
    this.form = new FormGroup({
      customer_nm: new FormControl("", [Validators.required]),
      mobile_no: new FormControl(""),
      email_id: new FormControl(""),
      attachment:new FormControl(""),
      rating1:new FormControl(""),
      like1:new FormControl(""),
      aspect:new FormControl(""),
      // recommendRating:new FormControl(""),
      // bestAspect:new FormControl(""),
      areaOfImprovement:new FormControl(""),
       comments:new FormControl("")
    });
  }
  get formCtrl() {
    return this.form.controls;
  }
  ngOnInit(): void {

  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload=[];
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


  

 
  listOfFiles: any[] = [];

  onFileChanged(event: any) {
    this.attachment = [];
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
  countStar(star:any) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }
  submitForm(){}
 
  ngOnDestroy(): void {
   // this.formDataSubscription.unsubscribe();
  }
}
