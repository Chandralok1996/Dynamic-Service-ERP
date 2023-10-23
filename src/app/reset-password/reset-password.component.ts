import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { AdminService } from "../_services/admin.service";
import { ToasterService } from "../_services/toaster.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  email: any;
  newPassword: any;
  confirmPassword: any;
  resetForm: any;
  userlistdata: any;
  userLoginNames: any = [];
  showPass: boolean = true;
  showPass1: boolean = true;
  emailid: any;
  userDetails: any;
  userID: any;
  resetPasswordDetails: any;
  submitted: boolean = false;
  matchpwd: any;

  minPw = 8;
  pageLabel: any;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: ToasterService,
    private adminService: AdminService
  ) {}
  ngOnInit(): void {
    this.userlist();

    this.resetForm = new FormGroup({
      loginName: new FormControl("", [Validators.required]),
      emailID: new FormControl(""),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,}$"
        ),
      ]),
      conpassword: new FormControl("", [Validators.required]),
    });
  }
  get formCtrl() {
    return this.resetForm.controls;
  }
  get passwordMatchError() {
    return (
      this.resetForm.getError("mismatch") &&
      this.resetForm.get("conpassword")?.touched
    );
  }

  keyPress(e: any) {
    console.log("djdj");

    var e = window.event || e;
    var key = e.keyCode;
    //space pressed
    if (key == 32) {
      //space
      return false;
    }
    return true;
  }
  keyup(val: any) {
    if (val.value == "") {
      this.matchpwd = "";
    } else {
      if (this.resetForm.value.password == "") {
        this.matchpwd = "Please fill password first";
        setTimeout(() => {
          this.matchpwd = "";
        }, 2000);
      } else {
        if (this.resetForm.value.password != this.resetForm.value.conpassword) {
          this.matchpwd = "Password is not matching";
          // setTimeout(() => {
          //   this.matchpwd=''
          // }, 3000);
        } else {
          this.matchpwd = "";
        }
      }
    }
  }
  userlist() {
    var a = this.adminService.userlist().subscribe((res: any) => {
      console.log(res);
      console.log(res.status);
      this.userlistdata = res.result;
    });
  }

  getUserName(res: any) {
    this.emailid = res["Email Id"];
    this.userID = res["user_id"];
  }
  getresetval() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    this.resetPasswordDetails = {
      user_id: this.userID,
      password: this.resetForm.value.password,
    };

    this.userDetails = this.resetForm.value;
    this.adminService
      .resetUserPassword(this.resetPasswordDetails)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.toaster.success(res.message);
          this.router.navigate(["/home"]);
        } else {
          this.toaster.error(res.message);
        }
      });
  }
}
