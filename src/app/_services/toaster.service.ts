import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ToasterService {

  constructor(private toastr: ToastrService) { }

  success(msg: string): void {
    this.toastr.success("Success", msg);
  }
  
  warning(msg: string): void {
    this.toastr.warning("Warning", msg);
  }
  
  error(msg: string): void {
    this.toastr.error("Error", msg);
  }
  
  info(msg: string): void {
    this.toastr.info("Information", msg);
  }
}
