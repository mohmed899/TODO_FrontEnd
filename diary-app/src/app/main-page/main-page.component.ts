import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DiaryFormComponent } from '../diary-form/diary-form.component';
import { SseService } from '../Services/sse.service';
import { ToastMsgType } from '../enums/enums';
import { ToastService } from '../Services/toast.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [DialogService]
})
export class MainPageComponent implements OnInit {

  entries: any[] = [];
  overdueTaskIds: string[] = [];
  ref!: any;

  constructor(private diaryService: DataService, public dialogService: DialogService, public sseService: SseService, private toastService: ToastService,) { }

  ngOnInit(): void {
    this.getEntries();
    this.sseService.connect().subscribe(res => {
      console.log(res);
      if (res.data) {
        this.parseExpiredTaskIds(res.data);
        this.alertOverdueTasks();
        this.getEntries();
      }
    })

    this.sseService.mySubject.subscribe(res => {
      console.log(res);
      if (res.data) {
        this.parseExpiredTaskIds(res.data);
        this.alertOverdueTasks();
        this.getEntries();
      }
    })
  }

  getEntries(): void {
    this.diaryService.get().subscribe((data) => {
      this.entries = data;
    });
  }

  deleteEntry(entryId: number): void {
    this.diaryService.delete(entryId).subscribe(() => {
      this.toastService.openToast("Entery deleted ", ToastMsgType.Delete);
      this.getEntries();
    });
  }
  addEntery() {

  }

  openAddForm() {
    this.ref = this.dialogService.open(DiaryFormComponent, {
      header: 'New Task',
      width: '25%',
      contentStyle: {},
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((refresh: boolean) => {
      if (refresh) {
        this.getEntries();
      }
    });
  }

  onDeleteEntery() {
    this.toastService.openToast("Entery deleted ", ToastMsgType.Delete);
    this.getEntries();
  }

  parseExpiredTaskIds(idStringMsg: string) {
    this.overdueTaskIds = idStringMsg.slice(0, -1).split(',');
  }

  alertOverdueTasks() {
    this.entries.forEach(e => {
      if (this.overdueTaskIds.includes(e.id+''))
        this.toastService.openToast(`Task ${e.title}, is Overdue`, ToastMsgType.Info);
    })
  }
}
