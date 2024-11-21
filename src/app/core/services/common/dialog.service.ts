import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  // dialog
  openDialogMsg(msg: string): void {
    window.alert(msg)
  }

  async openConfirmDialog(msg: string): Promise<boolean> {
    return window.confirm(msg);
  }


}
