import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastMsgType } from '../enums/enums';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }
  openToast(message: string, toastType: ToastMsgType) {
    switch (toastType) {
      case ToastMsgType.Success:
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: message })
        break;
      case ToastMsgType.Info:
        this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: message })
        break;
      case ToastMsgType.Error:
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: message })
        break;
      case ToastMsgType.Delete:
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Delete', detail: message })
        break;

    }
  }
}
