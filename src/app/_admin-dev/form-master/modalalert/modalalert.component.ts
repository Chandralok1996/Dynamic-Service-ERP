import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PrevilengeComponent } from '../previlenge/previlenge.component';
import { AdminService } from 'src/app/_services';
import { ToasterService } from 'src/app/_services';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modalalert',
  templateUrl: './modalalert.component.html',
  styleUrls: ['./modalalert.component.css']
})
export class ModalalertComponent {
  constructor(private _mdr: MatDialogRef<PrevilengeComponent>,
    private admin:AdminService,
    private toaster:ToasterService,
    private router:Router,
     @Inject(MAT_DIALOG_DATA) public data: any, ) 
        {
        }
        closeDialog(status: boolean) {
          this._mdr.close(status);
        }
        applypre()
        {
          console.log(this.data);
                 this.admin.applyprevilenge(this.data).subscribe((res:any)=>{
      console.log(res);
      if(res.message=="Created successfully")
      {
        this.toaster.success("Previlenge has been set")
        this._mdr.close(false)
        setTimeout(() => {
          this.router.navigate(['admin/form-master'])
        }, 1000);
      }
    },
    (error: any) => {
      this.toaster.error(`${error.status} ${error.statusText}`);
      this._mdr.close(false)

    }
    
    )
        }
  }
