import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // For toasts
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toastr: ToastrService) { }

  successToast(description: string){
    this.toastr.success(description, '', {
      timeOut: 5000,
      progressBar: true,
      tapToDismiss: true,
      enableHtml: true,
      positionClass: "toast-bottom-right",
    });
  }
  errorToast(description: string){
    this.toastr.error(description, '', {
      timeOut: 5000,
      progressBar: true,
      tapToDismiss: true,
      enableHtml: true,
      positionClass: "toast-bottom-right",
    });
  }
}
