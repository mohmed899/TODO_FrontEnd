import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from '../Services/data.service';
import { MessageService } from 'primeng/api';
import { ToastService } from '../Services/toast.service';
import { ToastMsgType } from '../enums/enums';
@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.css']
})
export class DiaryFormComponent implements OnInit {

  uploadedImge: any;
  myForm: FormGroup;
  constructor(
    private diaryService: DataService,
    public ref: DynamicDialogRef,
    private toastService: ToastService,
    private fb: FormBuilder) {
    this.myForm = this.createFormGroup();
  }


  ngOnInit(): void {
  }



  closePopup(refresh: boolean): void {
    this.ref.close(refresh);
  }

  createFormGroup() {
    return (this.fb.group({
      Title: ['', Validators.required],
      dateTime: [null, Validators.required],
    }));
  }

  save() {

    if (this.myForm.valid) {
      this.diaryService.add(this.myForm.value).subscribe(res => {
        if (this.uploadedImge) {
          let enteryId = res.id;
          this.diaryService.uploadImage(this.uploadedImge, enteryId).subscribe(data => { this.closePopup(true); });
        } else
          this.closePopup(true);
        this.toastService.openToast("Saved Successfuly ", ToastMsgType.Success);
      });
    }
  }


  onSelectImg(event: any) {
    this.uploadedImge = event?.currentFiles[0];
  }


  before($event: any) {
  }
}


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
